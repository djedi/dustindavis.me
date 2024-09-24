# Dustin Davis Blog

This blog was originally forked from Kent C. Dodd's old Gatsby blog. I didn't like Gatsby so I took the basic designs
and migrated to 11ty to simplify everything.

## Create a new post

Run `newpost.sh`. It will prompt you for the title and then generate a new post for you.

## Uses Updates

Run the following scripts to update the uses page. These scripts will update files in the `_data` folder that will be
used to generate the uses page.

```bash
./get-applications.sh
./get-cli-tools.sh
```

For the browser extensions, use the
[Extension Exporter](https://chromewebstore.google.com/detail/extension-exporter/doikmfpjbcjjimnbablebijofdbgfepb)
extension to export your extensions. Then run:

```bash
./generate-extensions.js <path-to-exported-extensions.html>
```

## Deploy

This site is configured to deploy to Netlify. Simply push your changes to master and it will trigger a new build and
deploy.

## TODO

- [ ] update Uses with other sections
- [ ] Update about page with life changes
- [ ] Replace twitter icon with X
- [ ] Use one shared footer
