---
title: Rails on Dokku
description: Usually deploying to Dokku is a breeze! Just make sure Rail's isn't enforcing SSL--then it's less fun.
---

One of the great tools I've finally integrated into my workflow has been [Dokku](https://github.com/dokku/dokku). It's a great alternative to things like Heroku when it comes to deployment. It allows you to run your own PaaS (Platform as a Service) to host your applications. Once you've set it up (takes a few minutes with a Digital Ocean droplet) a simple `git push dokku master` and your application gets built and deployed.

At least most of the time.

After moving a few Elixir API's over to my Dokku instance with great success, I thought I'd move one of my Rails projects over as well! It was sitting on Heroku and often burning through my free credits, but not worth paying the $7/month on Heroku for.

Things started simple: update my local copy of the app and create a Procfile for the web and worker services. Create the application, Postgres database, and Redis store in Dokku and link them all together. Finally, I logged into Heroku to copy over the environment variables the application needed. With that all done I pushed to Dokku and watched it build the application as usual. A minute later I open up the new URL and have a rather confused look as I'm greated with my default Dokku app.

Now, I should only be seeing the default Dokku app when I'm visiting the Dokku host directly or something has gone awry and Dokku falls back to it.

Rather confused, I log into the VPS and confirm there are docker containers for both the web and worker processes (which there were) and that they were up and running (yep to that as well). I checked that my migrations were run, Postgres was responding, and Redis was up.

Very odd.

After a little bit of searching online I come up with very little. There are surprising few search results for Dokku and Rails issues (clearly things just work) which didn't bode well. Awhile longer of hitting dead ends I notice that the Rails app is only listening on port 80! The existing app was being served over SSL/TLS on port 443 so that must be the issue.

I confirm the docs to make sure I'm adding a port correctly and then attempt to add 443 as a new https port. Nope! Dokku won't let you add 443 unless you also have a certificate and private key for the app/domain. Great...I can't get a cert with Lets Encrypt because the app isn't responding on port 80!

This is a long winded way to say I forgot I had turned a little thing on in the `production.rb` config file

```ruby
config.force_ssl = true
```

With that turned back to false, and with another deploy up to Dokku the app finally responded and we were in the clear. Another minute to add new certs with Dokku, load up the old Heroku data into Postgres (`dokku postgres:import my-rails-app-pg < latest.dump`) and we're all set!

What I hoped would be a 10 minute migration turned into a few hours of frustration, all in the name of security! Dokku already  redirects to https if it's enabled so it's safe to leave that config set to false. If you want to enable it be sure you've setup SSL/TLS on Dokku already--it'll save you some time down the road!
Even with this rather unpleasant experience, it wasn't Dokku's fault and I would still suggest looking into hosting your applications with it! Heroku still provides some benefits but if you're deploying things to a VPS yourself, definitely look to switch over to Dokku.
