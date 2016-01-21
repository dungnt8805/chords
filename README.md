## How to run 

- pull docker mongodb
- create docker image
- run mongodb with cmd: "docker run -d -p 27017:27017 --name mongo mongo
- run web image with cmd: "docker run -itd -v ${PWD}:/usr/local/nonroot/app -p 80:8080 --name hopam --link mongo:mongo