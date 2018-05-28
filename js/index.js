var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var page = 'https://en.wikipedia.org/?curid=';

var MyApp = React.createClass({
  displayName: 'MyApp',


  getInitialState: function getInitialState() {
    return {
      value: '',
      data: []
    };
  },
  getRandom: function getRandom() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  },
  searchWiki: function searchWiki() {
    var _this = this;

    console.log(api + this.state.value);
    fetch(api + this.state.value).then(function (response) {
      return response.json();
    }).then(function (data) {
      var results = [];

      for (var i in data.query.pages) {
        results.push({ id: i, info: data.query.pages[i] });
      }
      _this.setState({ data: results });
    }).then(function (data) {
      return console.log(_this.state.data);
    });
  },
  handleChange: function handleChange(e) {
    this.setState({ value: e.target.value });
  },
  render: function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'h2',
          { className: 'text-center' },
          'Wikipedia Viewer'
        ),
        React.createElement('br', null),
        React.createElement(
          'div',
          null,
          React.createElement(
            'h5',
            { className: 'text-center' },
            'You can get a random article by clicking ',
            React.createElement(
              'a',
              { href: '', onClick: function onClick() {
                  _this2.getRandom();
                } },
              'here'
            ),
            ' '
          )
        ),
        React.createElement(
          'h5',
          { className: 'text-center' },
          'Or get a specific article by searching'
        ),
        React.createElement(
          'div',
          { className: 'col-lg-4 col-lg-offset-4 search row' },
          React.createElement('br', null),
          React.createElement('span', { className: 'fa fa-search' }),
          React.createElement('input', { className: 'form-control', type: 'text', onChange: this.handleChange, placeholder: 'Search' }),
          React.createElement('br', null),
          React.createElement('br', null),
          React.createElement(
            'button',
            { className: 'btn btn-primary center-block', onClick: function onClick() {
                _this2.searchWiki();
              } },
            'Search'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'results row' },
        this.state.data.map(function (object, i) {
          return React.createElement(ResultRow, { obj: object, key: i });
        })
      )
    );
  }

});

var ResultRow = React.createClass({
  displayName: 'ResultRow',

  render: function render() {
    return React.createElement(
      'div',
      { className: 'row col-lg-6 col-lg-offset-3' },
      React.createElement(
        'a',
        { href: page + this.props.obj.id, target: '_blank' },
        React.createElement(
          'div',
          { className: 'bs-callout bs-callout-info', id: 'callout-focus-demo' },
          React.createElement(
            'h3',
            null,
            this.props.obj.info.title
          ),
          React.createElement(
            'p',
            null,
            this.props.obj.info.extract
          )
        )
      )
    );
  }
});

React.render(React.createElement(MyApp, null), document.getElementById("container"));