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

## 1. Download the .env file attached to your email and move it into the project directory.
## 2. Open your terminal and navigate to the project directory.
## 3. Run: `npm install`,
## 4. Run: `docker build -t innoscripta-challenge .`,
## 5. Run: `docker run -p 3000:3000 innoscripta-challenge`
## 6. Open the link [http://localhost:3000] to access the app.