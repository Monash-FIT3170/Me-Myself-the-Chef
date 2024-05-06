import { useEffect, useState } from "react"

// components

const Page1 = () => {

  const [page1Data, setPage1Data] = useState(null)

  useEffect(() => {
    const fetchPage1Data = async () => {
      const response = await fetch('http://localhost:8080/api/page1data')
      const json = await response.json()

      if (response.ok) {
        setPage1Data(json)
      }
    }

    fetchPage1Data()
    console.log("Made API call for useEffect")
  }, [])
   

  return (
    <div className="page1">

        <p>Page 1 content</p>

        {page1Data && page1Data.map(i => (
          <p>{i}</p>
        ))}
      
    </div>
  )
}

export default Page1