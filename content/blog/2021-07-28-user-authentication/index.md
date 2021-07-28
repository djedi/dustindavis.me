---
slug: user-authentication
title: User Authentication
date: 2021-07-28
author: Dustin Davis
description:
  What led to our decision to use KeyCloak over other available options
categories:
  - SideHustle
  - KeyCloak
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on
  [Unsplash](https://unsplash.com)
---

Continuing with my posts about creating a new side-hustle start-up, let's talk
about user authentication.

How many times in your life have you coded up a user login form?

Ten years ago it was simple. You would pick the framework of your choice and it
would have some kind of user authentication system built-in. I suppose that is
still the case. We could use a framework and use its default auth system. But,
having worked in a corporation where security is a big concern, the direction
things are going with user authentication and authorization, we decided to step
back a bit and look at our options.

In my [last post](/blog/starting-a-new-side-hustle-startup), I mentioned that
after going back and forth on using Hasura, we decided that was a technology we
wanted to use. If you follow the
[Hasura tutorial](https://hasura.io/learn/graphql/hasura/introduction/), it will
have you
[set up an Auth0 account](https://hasura.io/learn/graphql/hasura/authentication/1-create-auth0-app/).

Auth0 is great, but I'm not sure how much money this system is going to bring in
and I don't really want to turn around and give it to all the third-party
systems supporting us. With the site we are building, we are going to have A LOT
of free users authenticating into our system, so it could get expensive fast in
an ideal situation.

Another alternative we considered is using Firebase. The same problem exists
there.

We could use a framework like Django that includes authorization and we could
build out an admin interface. I didn't explore that too far but kept it in my
back pocket as an option.

I did decide to search for open-source alternatives to Auth0. The two main
projects I found were [KeyCloak](https://www.keycloak.org/) and
[Ory](https://www.ory.sh/).

KeyCloak is more mature and is written in Java. Ory is newer with a more
microservice-oriented architecture and is written in Go.

Ultimately, I think it was this comment on
[ycombinator](https://news.ycombinator.com/item?id=22871460) that led me to
choose KeyCloak:

> If you need an integrated identity database out of the box, go for Keycloak
> today. Comes with OIDC and SAML, both work great. Ory Kratos still requires
> some manual tinkering.

I need something today and I like that KeyCloak comes with a user interface to
control things. Ultimately, I felt I could get started faster with it and it
would give me all the features and need and want now and into the future.

I don't know Java and I've only used Go a few times. But fortunately, we have
Docker! I'm confident that a docker container should provide what I need without
having to do much to get KeyCloak up and running.

# Learning KeyCloak

Fortunately, there are a lot of resources to learn KeyClock. Just do a search
for "keycloack tutorial" and you will see this.

Fortunately for me, I found this excellent
[project on github](https://github.com/janhapke/hasura-keycloak) that has all
the docker-compose file all set up to run Hasura and KeyCloak along with
instructions for using KeyCloak instead of Auth0 on the Hasura tutorial!

The only issue I had while walking through that tutorial was that there is one
line in the `docker-compose.yml` file that needs to be uncommented in order for
things to work.

```yaml
# un-comment the following line to activate JWT Authentication:
# HASURA_GRAPHQL_JWT_SECRET: '{ "type": "RS256", "jwk_url": "http://keycloak:8080/auth/realms/master/protocol/openid-connect/certs" }'
```

Once I got that tutorial working, I used that `docker-compose.yml` file as a
base for our new project. Now I can move on to setting up our development
environment in docker and configure KeyCloak and Hasura to authenticate a user.
This will be step one and a major milestone.
