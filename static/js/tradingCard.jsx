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


class TradingCardForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      skill: ''
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.updateCards = this.updateCards.bind(this);
  }

  addNewCard() {
    // FIXME
    const formData = {
        skill: this.state.skill,
        name: this.state.name
      };
    $.post('/add-card', formData, this.updateCards);
  }

  updateCards() {
    $.get('/cards.json', this.props.handleNewCardAdded);
    alert('Added a new Card.');
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSkillChange(e) {
    this.setState({ skill: e.target.value });
  }

  render() {
    return (
      <form>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />

        <label for="skill">Skill:</label>
        <input
          id="skill"
          type="text"
          value={this.state.skill}
          onChange={this.handleSkillChange}
        />

        <button onClick={this.addNewCard}>Add</button>
      </form>
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
    this.updateCards = this.updateCards.bind(this);
  }

  updateCards(response) {
    const cards = response.cards;
    this.setState({ tradingCardData: cards , isLoaded: true});
  }

  getCardData() {
    $.get('/cards.json', this.updateCards);
  }

  componentDidMount() {
    this.getCardData();
  }

  // componentDidMount() {
  // $.get('/cards.json', (result) => {
  // this.setState({tradingCardData: result.cards,
  //                isLoaded: true})
  //   });
  // }

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
      return <div><TradingCardForm handleNewCardAdded={this.updateCards}/>
             <div>{tradingCards}</div>
             </div>;
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
