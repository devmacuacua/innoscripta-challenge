## *Install Docker Desktop (If not installed)*

## *For Linux Run*

1. `sudo apt-get update`
2. `sudo apt install gnome-terminal`
3. Download the latest DEB package on (https://docs.docker.com/desktop/setup/install/linux/ubuntu/)
4. Install the package downloaded with apt running: `sudo apt-get install ./docker-desktop-amd64.deb` (NOTE: make sure to point on file location)
5. After installation note that by default, Docker Desktop is installed at /opt/docker-desktop
6. Finally, you can open docker Desktop running `systemctl --user start docker-desktop`

## *For MacOS and Windows*

1. Download the installers 
2. Run them to complete the installation process

## *Run INNOSCRIPTA-NEWS*

1. Download the .env file attached to your email and move it into the project directory Note: When the file is downloaded, you may find it saved with a different name. Please make sure to rename it to .env if the downloaded name is different.
2. Open your terminal and navigate to the project directory
3. Run: `npm install`
4. Run: `docker build -t innoscripta-challenge .`
5. Run: `docker run -p 3000:3000 innoscripta-challenge`
6. Open the link [http://localhost:3000] to access the app.

## *Last Considerations*

This app relies on external APIs:
1. *News API*
2. *NY Times API*
3. *The Guardian API*

Since the app is using free plans for these APIs, there are daily query limits.
Depending on the number of requests made, these limits can be reached, which may result in the app temporarily being unable to fetch new data.

When downloading the .env file, please note that it may be saved with a different name. Make sure to rename it to .env if necessary before running the app.