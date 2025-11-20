# 🔒 Security & Deployment Checklist

## ⚠️ CRITICAL SECURITY NOTES

### Before ANY Deployment:

1. **NEVER commit `.env` file to Git**
   ```bash
   # Verify .env is in .gitignore
   cat .gitignore | grep ".env"
   
   # If .env was accidentally committed, remove it:
   git rm --cached .env
   git commit -m "Remove .env from repository"
   git push
   ```

2. **Revoke exposed credentials immediately if leaked**
   - Gmail App Password: https://myaccount.google.com/apppasswords
   - Database passwords
   - API keys
   - APP_KEY

3. **Use `.env.example` for templates** (safe to commit)
   - Contains placeholder values only
   - No real credentials

---

## 🚀 Deployment Checklist

### Pre-Deployment (Development → Production)

#### Step 1: Environment Configuration

```bash
# Copy production template
cp .env.production.example .env

# Edit with production values
nano .env
```

**Required Changes in `.env`:**
```env
APP_ENV=production
APP_DEBUG=false  # ⚠️ CRITICAL: Must be false!
APP_URL=https://yourdomain.com  # Your actual domain

DB_DATABASE=florist_production
DB_USERNAME=florist_user  # NOT root!
DB_PASSWORD=STRONG_RANDOM_PASSWORD_HERE

MAIL_USERNAME=your_production_email@gmail.com
MAIL_PASSWORD=your_production_app_password

SESSION_SECURE=true  # ⚠️ HTTPS only!
LOG_LEVEL=error  # Don't log debug info in production
```

#### Step 2: Security Hardening

```bash
# Generate new APP_KEY
php artisan key:generate

# Create strong database password
# Use: https://passwordsgenerator.net/ (min 20 chars)

# Setup database user with limited permissions
mysql -u root -p
```

```sql
CREATE DATABASE florist_production;
CREATE USER 'florist_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON florist_production.* TO 'florist_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Step 3: File Permissions

```bash
# Set correct ownership
sudo chown -R www-data:www-data /var/www/florist

# Set directory permissions
sudo find /var/www/florist -type d -exec chmod 755 {} \;

# Set file permissions
sudo find /var/www/florist -type f -exec chmod 644 {} \;

# Storage & cache must be writable
sudo chmod -R 775 /var/www/florist/storage
sudo chmod -R 775 /var/www/florist/bootstrap/cache
```

#### Step 4: Install Dependencies

```bash
# PHP dependencies (production only)
composer install --optimize-autoloader --no-dev

# JavaScript dependencies
npm install

# Build assets for production
npm run build
```

#### Step 5: Database Setup

```bash
# Run migrations
php artisan migrate --force

# Seed database (if needed)
php artisan db:seed --force

# Create storage link
php artisan storage:link
```

#### Step 6: Optimize Laravel

```bash
# Cache configuration
php artisan config:cache

# Cache routes
php artisan route:cache

# Cache views
php artisan view:cache

# Optimize autoloader
composer dump-autoload --optimize
```

#### Step 7: Setup Queue Worker

**Create Supervisor config:**
```bash
sudo nano /etc/supervisor/conf.d/florist-worker.conf
```

```ini
[program:florist-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/florist/artisan queue:work database --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/florist/storage/logs/worker.log
stopwaitsecs=3600
```

```bash
# Start supervisor
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start florist-worker:*

# Check status
sudo supervisorctl status
```

#### Step 8: Setup Cron Jobs

```bash
# Edit crontab
crontab -e

# Add Laravel scheduler
* * * * * cd /var/www/florist && php artisan schedule:run >> /dev/null 2>&1
```

#### Step 9: Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/florist
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/florist/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/florist /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 10: Install SSL Certificate

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## 🧪 Post-Deployment Testing

### Critical Tests:

```bash
# Test 1: Health Check
curl https://yourdomain.com/health

# Expected: {"status":"ok","database":"connected","timestamp":"..."}

# Test 2: Homepage loads
curl -I https://yourdomain.com

# Expected: HTTP/2 200

# Test 3: SSL is working
curl https://yourdomain.com (should NOT show SSL errors)

# Test 4: Queue worker is running
sudo supervisorctl status florist-worker:*

# Expected: RUNNING

# Test 5: Cron job is setup
crontab -l | grep florist

# Expected: Laravel schedule command

# Test 6: File permissions
ls -la /var/www/florist/storage

# Expected: www-data:www-data with 775
```

### Manual Tests:

1. ✅ Register new user → Receive OTP email
2. ✅ Verify OTP → Email verified
3. ✅ Login → Dashboard accessible
4. ✅ Browse products → Products display
5. ✅ Add to cart → Cart updates
6. ✅ Checkout → Order created
7. ✅ Admin login → Admin panel accessible
8. ✅ Admin create product → Product appears
9. ✅ Admin update order status → Status changes
10. ✅ Test on mobile device → Responsive

---

## 🔄 Updating Production

### Workflow for Updates:

```bash
# 1. SSH to server
ssh root@your-vps-ip

# 2. Navigate to project
cd /var/www/florist

# 3. Enable maintenance mode
php artisan down

# 4. Pull latest code
git pull origin main

# 5. Install dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# 6. Run migrations
php artisan migrate --force

# 7. Clear & rebuild caches
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 8. Restart queue workers
sudo supervisorctl restart florist-worker:*

# 9. Disable maintenance mode
php artisan up

# 10. Test
curl https://yourdomain.com/health
```

---

## 🛡️ Security Best Practices

### 1. Database Security
- ✅ Use dedicated DB user (not root)
- ✅ Strong password (20+ chars, random)
- ✅ Grant minimal permissions (SELECT, INSERT, UPDATE, DELETE only)
- ✅ Regular backups (daily)

### 2. Application Security
- ✅ APP_DEBUG=false in production
- ✅ APP_ENV=production
- ✅ LOG_LEVEL=error (not debug)
- ✅ SESSION_SECURE=true (HTTPS only)
- ✅ Rate limiting enabled (done ✅)
- ✅ CSRF protection enabled (Laravel default)
- ✅ XSS protection (Laravel default)

### 3. Server Security
- ✅ UFW firewall enabled
- ✅ Only ports 22, 80, 443 open
- ✅ SSH key authentication (disable password)
- ✅ Regular security updates: `sudo apt update && sudo apt upgrade`
- ✅ Fail2ban for brute force protection

### 4. File Security
- ✅ Correct permissions (755 dirs, 644 files)
- ✅ Storage writable (775)
- ✅ .env not web-accessible (outside public/)
- ✅ .git folder blocked by Nginx

### 5. Monitoring
- ✅ Health check endpoint: `/health`
- ✅ Error logs: `storage/logs/laravel.log`
- ✅ Queue worker logs: `storage/logs/worker.log`
- ✅ Nginx logs: `/var/log/nginx/`
- ✅ Setup uptime monitoring (UptimeRobot, Pingdom)

---

## 📊 Monitoring Commands

### Check Application Health

```bash
# Laravel logs (last 50 lines)
tail -n 50 /var/www/florist/storage/logs/laravel.log

# Worker logs
tail -n 50 /var/www/florist/storage/logs/worker.log

# Nginx error logs
sudo tail -n 50 /var/log/nginx/error.log

# Check disk space
df -h

# Check memory usage
free -h

# Check CPU usage
top

# Check queue jobs
php artisan queue:monitor

# Check failed jobs
php artisan queue:failed
```

### Database Backup

```bash
# Manual backup
mysqldump -u florist_user -p florist_production > backup_$(date +%Y%m%d).sql

# Automated daily backup (add to crontab)
0 2 * * * mysqldump -u florist_user -pYOUR_PASSWORD florist_production | gzip > /backups/florist_$(date +\%Y\%m\%d).sql.gz

# Keep only last 7 days
0 3 * * * find /backups -name "florist_*.sql.gz" -mtime +7 -delete
```

---

## 🚨 Emergency Procedures

### Website Down

```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check PHP-FPM
sudo systemctl status php8.2-fpm

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm

# Check error logs
sudo tail -n 100 /var/log/nginx/error.log
tail -n 100 /var/www/florist/storage/logs/laravel.log
```

### Database Connection Issues

```bash
# Check MySQL status
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Test connection
mysql -u florist_user -p florist_production

# Check Laravel can connect
php artisan tinker
>>> DB::connection()->getPdo();
```

### Queue Worker Not Processing

```bash
# Check supervisor status
sudo supervisorctl status

# Restart workers
sudo supervisorctl restart florist-worker:*

# Check worker logs
tail -f /var/www/florist/storage/logs/worker.log

# Manually run queue
php artisan queue:work --once
```

### Rollback Deployment

```bash
# Enable maintenance
php artisan down

# Revert to previous commit
git reset --hard HEAD~1

# Reinstall old dependencies
composer install --optimize-autoloader --no-dev
npm install
npm run build

# Rollback database (if migration failed)
php artisan migrate:rollback --step=1

# Clear caches
php artisan config:clear
php artisan cache:clear

# Restart workers
sudo supervisorctl restart florist-worker:*

# Disable maintenance
php artisan up
```

---

## 📝 Quick Reference

### Important Paths

```
Project Root:        /var/www/florist
Public Directory:    /var/www/florist/public
Storage:             /var/www/florist/storage
Logs:                /var/www/florist/storage/logs
Environment:         /var/www/florist/.env
Nginx Config:        /etc/nginx/sites-available/florist
Supervisor Config:   /etc/supervisor/conf.d/florist-worker.conf
SSL Certificates:    /etc/letsencrypt/live/yourdomain.com/
```

### Important Commands

```bash
# Clear all caches
php artisan optimize:clear

# Rebuild all caches
php artisan optimize

# Maintenance mode ON
php artisan down

# Maintenance mode OFF
php artisan up

# View routes
php artisan route:list

# View config
php artisan config:show

# Test email
php artisan tinker
>>> Mail::raw('Test', fn($msg) => $msg->to('test@example.com')->subject('Test'));
```

---

## ✅ Final Checklist Before Going Live

```
☐ .env configured for production (APP_DEBUG=false, etc.)
☐ APP_KEY generated
☐ Database user created with limited permissions
☐ Strong passwords used (database, email)
☐ File permissions set correctly (755/644/775)
☐ Dependencies installed (composer, npm)
☐ Migrations run successfully
☐ Assets built (npm run build)
☐ Caches generated (config, route, view)
☐ Queue worker configured and running
☐ Cron job setup for scheduler
☐ Nginx configured correctly
☐ SSL certificate installed and working
☐ Health check endpoint returns OK
☐ Email sending works (test OTP)
☐ All features tested manually
☐ Monitoring setup (uptime, errors)
☐ Backup strategy configured
☐ Emergency procedures documented
☐ Team notified of launch
```

---

## 📞 Support Contacts

- **IDCloudHost Support:** https://idcloudhost.com/support
- **Laravel Documentation:** https://laravel.com/docs
- **Server Issues:** Check `/var/log/nginx/error.log` and `storage/logs/laravel.log`

---

**Last Updated:** November 20, 2025  
**Version:** 1.0
