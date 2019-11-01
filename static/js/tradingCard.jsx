// var tradingCardData = [
//   {
//     name: 'Balloonicorn',
//     skill: 'video games',
//     imgUrl: '/static/img/balloonicorn.jpg'
//   },

//   {
//     name: 'Float',
//     skill: 'baking pretzels',
//     imgUrl: '/static/img/float.jpg'
//   },

//   {
//     name: 'Llambda',
//     skill: 'knitting scarves',
//     imgUrl: '/static/img/llambda.jpg'
//   }
// ];


class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p>Name: {this.props.name}</p>
        <img src={this.props.imgUrl} />
        <p>Skill: {this.props.skill} </p>
      </div>
    );
  }
}

class TradingCardContainer extends React.Component {
  constructor(){
      super();
      this.state = {
        tradingCardData: [],
        isLoaded: false
      };
  }
  componentDidMount() {
  $.get('/cards.json', (result) => {
  this.setState({tradingCardData: result.cards,
                 isLoaded: true})
    });
  }
  render() {
    const tradingCards = [];
    for (const currentCard of this.state.tradingCardData) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }
    if (this.state.isLoaded){
      return <div>{tradingCards}</div>;
    }
    else{
      return <p>Loading...</p>;
    }
  }
}

ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('container')
);
