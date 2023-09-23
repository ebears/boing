# Use a more recent Ubuntu base image
FROM ubuntu:latest

# Install required software
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    nodejs npm default-jdk git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Clone the Git repository and clean up
RUN git clone --depth 1 https://github.com/ebears/boing.git /boing && \
    rm -rf /boing/.git

# Setup volumes
VOLUME /boing/data

# Expose network ports
EXPOSE 6567/tcp
EXPOSE 6567/udp

# Execute script
ENTRYPOINT ["/boing/run.sh"]
