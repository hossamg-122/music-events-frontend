// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Api Routes can't be used with next export
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
