# Editing your portfolio

Everything on your site (projects, images, your bio, contact links) is edited in one place: the admin panel, which lives on your own site.

**Your admin panel:** `https://psantani.art/admin` *(bookmark this)*
**Log in** with the email and password you were given. If you ever lose your password, ask me to reset it.

## The two things you can edit

- **Projects**: every project on the site, with its title, description, images, colour and order.
- **Site Settings**: everything else, including your name, bio, school, email, Instagram link, photo, CV and the homepage hero image.

## Making a change

1. Open the thing you want to edit and change it, then press **Save Draft**. Nothing is public yet.
2. When you're happy, press **Publish Changes**.
3. The live site updates within about a minute. Refresh your site to see it.

Changed your mind before publishing? Use **Revert to Published** to discard the draft.

## Adding a new project

1. In **Projects**, click **Create New**.
2. **Basics** tab: title, web address (lowercase-with-hyphens, e.g. `my-new-project`), category, course, year, tools, and an accent colour (a hex code like `#e42525`; pick one at htmlcolorcodes.com). Tick **Show on the homepage** if it belongs in the featured grid.
3. **Copy** tab: short description (for lists), the project note (the main paragraph), an optional highlight block, and optional story sections (a title, some text and an image each).
4. **Images** tab: upload a cover image, an optional thumbnail for the scrolling rows, and gallery images with optional captions. Every image asks you to describe it in one line, for people using screen readers and for search engines.
5. **Advanced** tab: leave these alone unless a picture sits oddly in the big header.
6. **Publish Changes.**

**Images:** JPG or PNG straight from your exports is fine; the site resizes them for visitors. Aim for at least 1600px on the long edge, and no more than about 2400px.

## Reordering projects

In the **Projects** list, drag the handle at the left of each row up or down. The site follows this order everywhere within about a minute.

## Site Settings

- **Your name, subtitle, header eyebrow, site description, portfolio statement**: the text on the homepage.
- **About text**: your bio. The first paragraph also appears at the bottom of the homepage; leave a blank line between paragraphs.
- **School / program, contact email, Instagram link, photo of you, CV (PDF)**: all optional. Anything left empty simply doesn't appear. Once an email is set, a Contact link appears in the header and footer.
- **Homepage hero image**: the large picture behind your name.

## Previewing before publishing

With a draft saved, press the **Preview** button (top right of the edit screen). It opens the real site showing your unpublished changes, visible only to you. When done, visit `/api/disable-draft` (or just close that tab) to go back to the normal view.

## Adding another editor

In **Users**, click **Create New** and enter their email and a password. Each person can only change their own password.

## If something looks wrong

- Give it a minute and refresh; changes take about a minute to appear.
- Every published version is kept: open **Versions** at the top of a project's edit screen to see history and restore an older version.
- Still stuck? Nothing you do in the admin panel can break the site's design or code. Worst case, the previous version can be restored; just message me.
