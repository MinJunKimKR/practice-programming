FROM ubuntu:focal

LABEL "com.github.actions.name"="Send Webex Message to Room"
LABEL "com.github.actions.description"="Send a message to the given room on Webex"
LABEL "com.github.actions.icon"="message-circle"
LABEL "com.github.actions.color"="orange"

LABEL "repository"="http://github.com/justinyoo/send-webex-message-to-room"
LABEL "homepage"="http://github.com/justinyoo"
LABEL "maintainer"="Justin Yoo <no-reply@aliencube.com>"

# Install curl - 우분투에는 안깔려있으니까
RUN apt-get update && apt-get install -y \
    sudo \
    curl \
    && rm -rf /var/lib/apt/lists/*

# copy해서 넣어준다
ADD entrypoint.sh /entrypoint.sh
# 실행권한을 재설정 해준다.
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]