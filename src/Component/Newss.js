import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const Newss = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const Update = async () => {
    props.setprogress(10);                                   //this is progrees code snippt
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setprogress(30);                                   //this is progrees code snippt
    let parsdata = await data.json();
    props.setprogress(70);                                   //this is progrees code snippt
    console.log(parsdata);

    setArticles(parsdata.articles)
    settotalResults(parsdata.totalResults)
    setLoading(false)


    props.setprogress(100);                                   //this is progrees code snippt
  }


useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)} - NeverNews`;
  Update();
  // eslint-disable-next-line
}, [])




  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pagesize=${props.pagesize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsdata = await data.json();
    console.log(parsdata);
    setArticles(articles.concat(parsdata.articles))
    settotalResults(parsdata.totalResults)
    setLoading(false)
  }

  return (

    <>
      <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"40px" }}>NeverNews - Top {capitalizeFirstLetter(props.category)} </h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length} // Corrected prop name
        next={fetchData} // Make sure you have a fetchData function defined
        hasMore={articles.length < totalResults} // Corrected prop name
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">

            {articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <Newsitem title={element.title ? element.title.slice(0, 40) : ""} desc={element.description ? element.description.slice(0, 80) : ""}
                  imgurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} />
              </div>

            })}
          </div>
        </div>

      </InfiniteScroll>

    </>
  )

}


Newss.defaultProps = {
  country: 'in',
  pagesize: 9,
  category: 'general',
  page: 1,
  totalResults: 0,
}

Newss.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}

export default Newss
