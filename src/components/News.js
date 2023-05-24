import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  
    static defaultProps={
      country:'in',
      pageSize:6,
      category:'sports'
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      
    }


          constructor(props){
            super(props);
            
            this.state={
              articles:[],
              loading:true,
              page:1,
              totalResults:0
              
            }
            document.title=`${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsMonkey`;
          
          
          }
async updateNews(){
 
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data= await fetch(url);
            let parsedData= await data.json();
            console.log(parsedData);
          
            this.setState({
              articles:parsedData.articles,
                totalResults:parsedData.totalResults,
                loading:false
               })
              
}

          async componentDidMount(){
             
             const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
             this.setState({loading:true}); 
             let data= await fetch(url);
               let parsedData= await data.json();
           
               this.setState({
                
                articles:parsedData.articles,
                totalResults:parsedData.totalResults,
                loading:false,
               
              })
          }
       

          fetchMoreData = async() => {
            console.log(this.state.page);
            // this.setState({
            //   page:this.state.page + 1,
            //   });
            console.log(this.state.page);
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            
            let data= await fetch(url);
            let parsedData= await data.json();
            console.log(parsedData);
          
            this.setState({
              articles:this.state.articles.concat(parsedData.articles),
                totalResults:parsedData.totalResults,
                loading:false,
                page:this.state.page + 1
               })
               
          };

          handlePreviousClick= async()=>{

                    this.setState({
                    page:this.state.page - 1,
                    })

             this.updateNews();
          }

           handleNextClick = async () => {
            this.setState({ page: this.state.page + 1 });
            this.updateNews();
        }

  render() {
    
    return (
      <>
        <h2 className='text-center mb-3'>NewsMonkey-Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines</h2>

       {/* {this.state.loading && <Spinner />}  */}
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.totalResults}
          loader={<Spinner/>}
        >

<div className="container">
        <div className='row'>
        { this.state.articles.map((element)=>{
            return(
           <div className="col md-3" key={element.url}>
        <NewsItem  title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0,50):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        </div> 
        )
        })}
        </div>
  </div>
        </InfiniteScroll>
        
      </>
    )
  }
}

export default News
