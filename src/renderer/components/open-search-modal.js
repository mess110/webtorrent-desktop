const React = require('react')
const pirata = require('pirata')
const TextField = require('material-ui/TextField').default
const FlatButton = require('material-ui/FlatButton').default

const {dispatch, dispatcher} = require('../lib/dispatcher')

var timeout = null
var searchResults = []

module.exports = class OpenTorrentAddressModal extends React.Component {
  render () {
    return (
      <div className='open-torrent-address-modal'>
        <p><label>Search</label></p>
        <div>
          <TextField
            id='torrent-address-field'
            className='control'
            ref={(c) => { this.torrentURL = c }}
            fullWidth
            onKeyDown={handleKeyDown.bind(this)} />
        </div>
        <div>
          {searchResults}
        </div>
        <div className='float-right'>
        <FlatButton
          className='control cancel'
          label='CANCEL'
          onClick={dispatcher('exitModal')} />
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.torrentURL.input.focus()
  }
}

function handleKeyDown (e) {
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    var textInput = document.getElementById('torrent-address-field')
    search.call(this, textInput.value)
  }, 500);
}

function search (s) {
  var opts = {
    url: "https://pirateproxy.red/",
    url: "https://thepiratebay.org/",
    // page: 2, // note: start in 0.
    // cat: CATEGORY_CODE // Audio = 100, Video = 200, Apps = 300, Games = 400, Porn = 500
  }

  pirata.search(s, opts, function(err, res){
    searchResults = res.map(
      (torrent) => renderTorrent(torrent)
    )
  });
}

function renderTorrent (torrent) {
  console.log(torrent)
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        {torrent.name}
      </div>
      <div>
        <i
          className='icon add'
          title='Add torrent'
          onClick={dispatcher('addTorrent', torrent.magnet)}>
          add
        </i>
      </div>
    </div>
  )
}
