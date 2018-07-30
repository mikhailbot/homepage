---
title: Phoenix Scoped Routes
date: 2018-07-30
description: The router within Phoenix is the hub of your application, and therefor is very robust at handling whatever workload you send it’s way. One of my favourite features is the ability to scope your various routes. This allows you to target a group of routes with a middleware plug. Commonly this can be used to break up your API into versions or section off admin routes.
---

The router within Phoenix is the hub of your application, and therefor is very robust at handling whatever workload you send it’s way. One of my favourite features is the ability to scope your various routes. This allows you to target a group of routes with a middleware plug. Commonly this can be used to break up your API into versions or section off admin routes.

Another benefit the router gives you are path helpers—super helpful in views and tests to target specific routes. To get a view of your routes and their helpers just call `$ mix phx.routes` from the terminal in your project folder.

If you have some scopes setup you may realize a small issue however—by default the scopes all have the same path helper for any shared routes! I ran into this while working on our wedding website—the invitations submissions were hitting the admin route (looking for the `id`) instead of the public route (looks for the `code`).

A quick lock at the docs and there’s a simple fix! Just add an `as: :admin` option to the scope, or whatever your scope is called. If you recheck the generated routes you should now have nicely scoped path helpers!


```elixir
# router.ex

scope "/public", WeddingApiWeb, as: :public do
  ...
end


# mix phx.routes

...
invitation_path GET /invitations/:id WeddingApiWeb.InvitationController :show

public_invitation_path GET /public/invitations/:code WeddingApiWeb.InvitationController :show
...
```

Sometimes it's the little things that make you smile.