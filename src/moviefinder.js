class MovieFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
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

    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=b7da8d63`)
    .then((response) => {
    if (response.ok) {
      // .ok returns true if response status is 200-299
      return response.json();
    }
    throw new Error('Request was either a 404 or 500');
    }).then((data) => {
    console.log(data);  // log the response data for now
      }).catch((error) => {
    console.log(error);
    })
    
  };

  render () {
    const { searchTerm, results } = this.state;
    return (
      <div className="container">
        <h1> OMG Movie Finder OMG </h1>
        <h3>{searchTerm}</h3>
        <h3> OMG </h3>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit} className="form-inline my-4">
              <input
                type="text"
                className="form-control mr-sm-2"
                placeholder="frozen"
                value={searchTerm}
                onChange={this.handleChange}
              />
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {results.map((movie) => {
              return null;  // returns nothing for now
            })}
          </div>
        </div>
      </div>
    )
  };
};

ReactDOM.render(
  <MovieFinder />,
  document.getElementById('root')
);