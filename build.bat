@echo off
 call npm install --cache-min 999999999
 echo.Please input the follow number to config the url. (e.g. 1)
 echo.0. https://www.baidu.com
 echo.1. https://www.mi.com
 echo.
 set /p num=
 gulp --env %num%
pause