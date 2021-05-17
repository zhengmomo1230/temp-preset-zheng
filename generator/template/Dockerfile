FROM 192.168.10.130/library/tomcat:latest
MAINTAINER liuxiaokang@shuihecehui.com
WORKDIR /usr/local

RUN rm -rf /usr/local/tomcat/webapps/*

RUN mkdir /usr/local/tomcat/webapps/ROOT

ADD dist/ /usr/local/tomcat/webapps/ROOT
#RUN yes|unzip /usr/local/tomcat/webapps/ROOT.war -d /usr/local/tomcat/webapps/ROOT/

RUN chmod 777 -Rf /usr/local/tomcat/webapps/*

ENV TZ=Asia/Shanghai

EXPOSE 8080