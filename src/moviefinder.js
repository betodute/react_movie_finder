class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({searchTerm: event.target.value});
  };

  handleSubmit(event) {
    event.preventDefault();
    let { searchTerm } = this.state; // ES6 Destructuring - an object is used because state is an object.
    searchTerm = searchTerm.trim();

    if (!searchTerm) {
      return; // love the semicolon it emphasizes that this line is, yes, absolutely done.
      // also worth noting how return does not have to return anything but can be used to close out the function
    }

    const checkStatus = (response) => {
      if (response.ok) {
        // .ok returns true if response status is 200-299
        return response;
      }
      throw new Error('Request was either a 404 or 500');
    }
    const json = (response) => response.json()

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b7da8d63`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.Response === 'False') {
          throw new Error(data.Error);
        }
        if (data.Response === 'True' && data.Search) {
          console.log(data.Search);
          this.setState({ results: data.Search, error: '' });
        }
      })
      .catch(error => {
        this.setState({ error: error.message });
        console.log(error);
      })
    
  };

  render () {
    const { searchTerm, results, error } = this.state;
    return (
      <div className="container">
        <h1 id="mainHeadline"> omg Movie Finder omg </h1>
        
        <h3 id="searchTermTitle"> {searchTerm} </h3>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="Movie Title"
                value={searchTerm}
                onChange={this.handleChange}
              />
              <button type="submit" className="m-2 btn btn-primary">Submit</button>
            </form>
            {(() => {
              if (error) {
                return error;
              }
              return results.map((movie) => {
                if (movie.Poster === 'N/A') {
                  movie.Poster = "src/pic-not-available-final.jpg"
                };
                console.log(movie.Poster)
                return <Movie key={movie.imdbID} movie={movie} />;
              })
            })()}
          </div>
        </div>
      </div>
    )
  };
};

const Movie = (props) => {
  const { Title, Year, imdbID, Type, Poster } = props.movie;  // ES6 destructuring
  return (
    <div className="row">
      <div className="col-4 col-md-3 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <img src={Poster} className="img-fluid" />
        </a>
      </div>
      <div className="col-8 col-md-9 mb-3">
        <a href={`https://www.imdb.com/title/${imdbID}/`} target="_blank">
          <h4>{Title}</h4>
          <p id="subRed">{Type} | {Year}</p>
        </a>
      </div>
    </div>
  )
}

ReactDOM.render(
  <MovieFinder />,
  document.getElementById('root')
);