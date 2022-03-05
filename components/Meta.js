import Head from "next/head"
const Meta = ({title,description,keywords}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta keywords={keywords} ></meta>
    </Head>
  )
}
Meta.defaultProps={
  title:"Music Events | Find The hottest parties",
  description: "Find the latest DJ and other musical events",
  keywords : "music,dj,drums,entertainment,"
} 
export default Meta