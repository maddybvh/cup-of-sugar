import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      items: [],
      limit: 50,
    };
  }

  componentDidMount() {
    this.onListenForItems();
  }

  onListenForItems = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .items()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot((snapshot) => {
        if (snapshot.size) {
          let items = [];
          snapshot.forEach((doc) =>
            items.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            items: items.reverse(),
            loading: false,
          });
        } else {
          this.setState({ items: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateItem = (event, authUser) => {
    this.props.firebase.items().add({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onEditItem = (item, text) => {
    const { uid, ...itemSnapshot } = item;

    this.props.firebase.item(item.uid).update({
      ...itemSnapshot,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveItem = (uid) => {
    this.props.firebase.item(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: state.limit + 5 }),
      this.onListenForItems,
    );
  };

  render() {
    const { text, items, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {!loading && items && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {items && (
              <ItemList
                authUser={authUser}
                items={items}
                onEditItem={this.onEditItem}
                onRemoveItem={this.onRemoveItem}
              />
            )}

            {!items && (
              <div>Add something you'd be willing to share ...</div>
            )}

            <form
              onSubmit={(event) => this.onCreateItem(event, authUser)}
            >
              <input
                placeholder="I'd by happy to share..."
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Items);
