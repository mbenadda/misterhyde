# MisterHyde

Misterhyde is a back-office meant to provide non-technical editors with a convenient way to work on Jekyll-generated sites.

Since it's Node, it should later be able to run on Windows and edit Jekyll sites remotely via FTP.

This is the repository for the backend API that allows direct modifications on the Jekyll site files. An early version of the frontend should be open-sourced soon.

Here's a list of planned (and already implemented) basic functions.

- [x] Edit a post
- [x] Create a new post
- [x] Delete a post
- [ ] Edit settings
- [ ] Manage drafts
- [ ] Allow Git versioning
- [ ] Add editable fields to Pages
- [ ] Manage custom types
- [ ] ...

---

## API routes list

*For now all API actions are irreversible, including modification and deletion of a post on disk. Confirmation should be required on the frontend part.*

### Post-related routes

Get a list of all existing posts, including all the metadata but without actual text content.

* /posts
* GET
* Returns :
  * **200** : `array of posts`
  * **500** : error
  
Get a single post, including its text content.

* /posts/*postkey*
* where *postkey* is the Jekyll name of the file containing the post, ie `2014-01-01-post-name`
* GET
* Returns :
  * **200** : `post`
  * **404** : no post with this *postkey*
  * **500** : error

Edit a post

* /posts/*postkey*
* POST
* Send only edited fields in JSON
* Returns
  * **200** : `edited post`
  * **404** : no post with this *postkey*
  * **500** : error
  
Delete a post

* /posts/*postkey*
* DELETE
* Returns
  * **200** : post deleted
  * **404** : no post with this *postkey*
  * **500** : error
  
Create a new post

* /posts/
* POST
* Send any field you need. `post.meta.slug`, `post.meta.date` and `post.meta.title` are necessary to correctly create the post. Other necessities depend on the way the Jekyll install is tuned.
* Returns :
  * **200** : `post`
  * **400** : Missing `post.meta.slug`, `post.meta.date` or `post.meta.title`
  * **500** : error
  
### Secondary post routes

Get full list of meta entries. This is useful for smart tagging forms and the like.

* /meta/*type*
* where *type* is any part of `post.meta` : it can be `tags`, `category`, etc.
* GET
* Returns :
  * **200** : `array of strings`
  * **500** : error
  
### Settings routes

Get a settings object with the contents of `_config.yml`

* /settings/
* GET
* Returns :
  * **200** : `settings object` - very raw for now
  * **500** : error



