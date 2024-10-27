FROM eclipse-temurin:17-jdk-alpine
VOLUME /tmp
COPY target/*.jar my-app.jar
ENTRYPOINT ["java","-jar","/my-app.jar"]
EXPOSE 8080