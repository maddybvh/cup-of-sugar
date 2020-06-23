import React, { Component } from 'react';

import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import ItemList from './ItemList';
import ItemInput from './ItemInput';

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      items: [],
      limit: 5,
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
            {!items && (
              <div>Add something you'd be willing to share ...</div>
            )}

            <ItemInput
              authUser={authUser}
              onCreateItem={this.onCreateItem}
              onChangeText={this.onChangeText}
              text={text}
            />

            {loading && <div>Loading ...</div>}

            {items && (
              <ItemList
                authUser={authUser}
                items={items}
                onEditItem={this.onEditItem}
                onRemoveItem={this.onRemoveItem}
                queryKey={this.props.queryKey}
              />
            )}

            {!loading && items && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={this.onNextPage}
                  className="btn btn-outline-secondary btn-sm"
                >
                  More
                </button>
              </div>
            )}
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Items);
