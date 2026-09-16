const signedIn = ({ req: { user } }) => Boolean(user);

// Returned as a query constraint rather than a boolean so the admin list view's
// bulk actions are filtered the same way single-document ones are.
const ownAccountOnly = ({ req: { user } }) => (user ? { id: { equals: user.id } } : false);

const anyAccountExceptYourOwn = ({ req: { user } }) => (user ? { id: { not_equals: user.id } } : false);

export const Users = {
  slug: "users",
  auth: true,
  labels: { singular: "User", plural: "Users" },
  // Two trusted editors, no role model. Everyone can invite a colleague and
  // revoke a departed one, but nobody can edit another account's email or
  // password; Payload's defaults allow that, which is a silent login takeover.
  // The admin panel's create-first-user flow registers with overrideAccess, so
  // an empty database can still bootstrap its first login.
  access: {
    read: signedIn,
    create: signedIn,
    update: ownAccountOnly,
    delete: anyAccountExceptYourOwn
  },
  admin: {
    useAsTitle: "email",
    description: "People who can log in and edit the site."
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name"
    }
  ]
};
