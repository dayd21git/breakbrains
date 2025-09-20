@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo    Загрузка основного мода ShieldCity

echo    Скачивание: ShieldCity.jar
powershell -Command "$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'http://45.93.200.89:8123/ShieldCity.jar' -OutFile 'ShieldCity.jar' -ErrorAction Stop"
if !errorlevel! equ 0 (
    echo    ShieldCity.jar успешно скачан!
) else (
    echo    Ошибка при скачивании ShieldCity.jar!
    pause
    exit /b 1
)

echo.
echo ========================================

set /p "download_others=Скачать ли остальные моды? (Нажмите Enter для согласия или любой другой символ для отказа): "
if "%download_others%"=="" (
    echo.
    echo ========================================
    echo    Загрузка дополнительных модов
    
    echo    Скачивание: mods.zip
    powershell -Command "$ProgressPreference = 'SilentlyContinue'; Invoke-WebRequest -Uri 'http://45.93.200.89:8123/mods.zip' -OutFile 'mods.zip' -ErrorAction Stop"
    
    if !errorlevel! equ 0 (
        echo    mods.zip успешно скачан!
    ) else (
        echo    Ошибка при скачивании mods.zip!
    )
	
	echo.
	echo ========================================
) else (
    echo.
    echo    Спасибо за загрузку! Установлен только основной мод.
)

echo.
echo Теперь моды можно поместить в игру...
pause >nul
