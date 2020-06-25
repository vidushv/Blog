# Blogging App using Microservices

## Introduction
This web app allows users to make posts and comment on them. The end result of the project is shown below:

![Final Product](https://github.com/vidushv/Blog/blob/master/docs/Product.png)

## Architecture
The application uses these Node JS for the backend and React for the front end. The application is split into the following microservices.

     1. Posts
     2. Comments
     3. Query
     4. Event-bus
     
Each microservice runs completely independtly of the others. This includes separate URLs for get/posts requests, separation of all data processing, and separation of data storage. 

### Posts and Comments microservice
The posts microservice is called when the user creates a new post. At this point, the text entered by the user is sent to the posts service and stored with the microservice itself. Each comment is tied to a post using a unique post id. The comments service then operates analogously for comments on each post. The implementation of both microservices is seen below.
![Posts and Comments](https://github.com/vidushv/Blog/blob/master/docs/Services.png)

The post service functions can be seen in more detail below.
![Posts](https://github.com/vidushv/Blog/blob/master/docs/PostsService.png)

Similarly with the comments service:
![Comments](https://github.com/vidushv/Blog/blob/master/docs/CommentsService.png)

### Query microservice
The query microservice was created to reduce rendering time of the front end page. The implmentation of only the comment and posts service necessitates querying *each comment for each post* when the page is initially rendered. As the app scales, we want to avoid such rendering times. The query service handles this requirement by storing comments and posts in a centralized data store and allowing us to perform queries on that. 
![Query](https://github.com/vidushv/Blog/blob/master/docs/QueryService.png)

### Event-bus
The purpose of the event bus is to facilitate communication between each of the microservices. The advantage of this is two-fold. First, it eliminates acess of one microservice's database by another microservice. And secondly, it provides additional data duplication that ensures recovery in the event of data loss. Consider an example where a post is created by the posts service. This information must be known to the query service to provide accurate queries on a given post. Hence, anytime a post is created by the posts service, it emits an event on the event-bus which is consumed by the query-service to generate a post on its datastore. 
