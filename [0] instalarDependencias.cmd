@echo off
SET Xproyecto=PROYECTO 1
title Ejecutando %Xproyecto% en NodeJS
COLOR 0A
MODE CON cols=140 lines=30
REM .bat con permisos de administrador
:-------------------------------------

REM  --> Analizando los permisos
    IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

REM --> Si hay error es que no hay permisos de administrador.
if '%errorlevel%' NEQ '0' (
    echo Solicitando permisos de administrador...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "getadmin.vbs"
    ::Echo UAC.ShellExecute %0, "", "", "runas", 1 >> "getadmin.vbs"
    Echo UAC.ShellExecute "%~n0%~x0", "", "", "runas", 1 >> "getadmin.vbs"

IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
>nul 2>&1 "%SystemRoot%\SysWOW64\WScript.exe" "getadmin.vbs"
) ELSE (
>nul 2>&1 "%SystemRoot%\System32\WScript.exe" "getadmin.vbs"
)

pushd "%~dp0"

if exist "getadmin.vbs" ( Del "getadmin.vbs" )
exit /B

:gotAdmin
pushd "%~dp0"
cls
echo.
echo /////////////////////////////////////
echo.
echo         NodeJS :: %Xproyecto%
echo         _________________
echo.
echo.
echo ++++++++++++++++++++++++++++++++++++
echo +                                  +
echo +           npm install            +
echo +                                  +
echo ++++++++++++++++++++++++++++++++++++
echo.

npm install

set pause=for %%n in (1 2) do if %%n==2 (for /f "eol= tokens=*" %%a in ("!args!") do (endlocal^&pause^>nul^|set/p=%%a^&echo()) else setlocal enableDelayedExpansion^&set args=

%pause% Presione cualquier tecla para salir...
