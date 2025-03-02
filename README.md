*Install Docker Desktop (If not installed)*

## *For Linux Run*

## 1. `sudo apt-get update`
## 2. `sudo apt install gnome-terminal`
## 3. Download the latest DEB package on (https://docs.docker.com/desktop/setup/install/linux/ubuntu/)
## 4. Install the package downloaded with apt running: `sudo apt-get install ./docker-desktop-amd64.deb` (NOTE: make sure to point on file location)
## 5. After installatoin note that by default, Docker Desktop is installed at /opt/docker-desktop.
## 6. Finally, you can open docker Desktop running `systemctl --user start docker-desktop`

## *For MacOS and Windows*

## 1. Download the installers 
## 2. Run them to complete the installation process.*

*Run INNOSCRIPTA-NEWS *

## 1. Go to project directory
## 2. Run: `docker build -t innoscripta-challenge .`,
## 3. Run: `docker run -p 3000:3000 innoscripta-challenge`
## 3. Open the link [http://localhost:3000] to access the app.