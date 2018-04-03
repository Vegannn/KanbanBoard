$(function() {
	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this; // useful for nested functions

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
		    // CREATING COMPONENTS OF COLUMNS
		    var $column = $('<div>').addClass('column col rounded bg-secondary mx-1 position-relative').attr("id",'a'+self.id).css({"height": "min-content"});
		    var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		    var $columnDelete = $('<button>').addClass('btn-delete close position-absolute mt-1 mr-2').css({"right":"0","top":"0"}).text('x');
		    var $columnCardList = $('<ul>').addClass('column-card-list p-0 mb-5').css({"min-height": "30px","list-style-type": "none"});
		    var $columnAddCard = $('<button>').addClass('add-card btn btn-dark position-absolute').text('Add').css({"right":"0","bottom":"0","width":"25%"});
		    var $columnAddCartT = $('<input type="input" id="inputCardName" class="form-control align-self-end position-absolute" placeholder="Enter card name...">').css({"left":"0","bottom":"0","width":"75%"});

		    // ADDING EVENTS
		    $columnDelete.click(function() {
		        self.removeColumn();
		    });

		    $columnAddCard.click(function(event) {
		        //self.addCard(new Card(prompt("Enter the name of the card")));
				var name = $(this).siblings("#inputCardName").val();
				if(name != ""){
					self.addCard(new Card(name));
				}		
				$(this).siblings("#inputCardName").val("");
		    });





		    // CONSTRUCTION COLUMN ELEMENT
		    $column.append($columnTitle)
		        .append($columnDelete)
		        .append($columnAddCard)
		        .append($columnCardList)
		        .append($columnAddCartT);

		    // RETURN OF CREATED COLUMN
		    return $column;
		}
	}

	Column.prototype = {
			addCard: function(card) {
			    this.$element.children('ul').append(card.$element);
			},
			removeColumn: function() {
			    this.$element.remove();
			}
		};


	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			// CREATING THE BLOCKS
			var $card = $('<li>').addClass('card d-flex flex-row justify-content-between my-1 border rounded bg-light position-relative');
			var $cardDelete = $('<button>').addClass('btn-delete close position-absolute mr-2').css({"right":"0"}).text('x');
			var $cardDescription = $('<p>').addClass('card-description my-1 mr-5 ml-1').text(self.description);	

			// BINDING TO CLICK EVENT
			$cardDelete.click(function(){
			    self.removeCard();
			});
			$card.append($cardDelete).append($cardDescription);

			return $card;
		}

	}

		Card.prototype = {
			removeCard: function() {
				this.$element.remove();
			}
		}

	var board = {
	    name: 'Kanban Board',
	    addColumn: function(column) {
	      this.$element.append(column.$element);
	      initSortable();
	    },
	    $element: $('#board .column-container')
	};
	
	function initSortable() {
		$('.column-card-list').sortable({
			connectWith: '.column-card-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}


	$('.create-column')
		.click(function(){
			//var name = prompt('Enter a column name');
			var name = $('#inputColumnName').val();
			if(name != ""){
				var column = new Column(name);
					board.addColumn(column);
				$("#inputColumnName").val("");	
			}			
		});


	// CREATING COLUMNS
	var mustColumn = new Column('Must');
	var shouldColumn = new Column('Should');
	var couldColumn = new Column('Could');
	var wontColumn = new Column('Wont');

	// ADDING COLUMNS TO THE BOARD
	board.addColumn(mustColumn);
	board.addColumn(shouldColumn);
	board.addColumn(couldColumn);
	board.addColumn(wontColumn);

	// CREATING CARDS
	var card1 = new Card('New task');
	var card2 = new Card('Create kanban boards Create kanban boards Create kanban boards v Create kanban boards Create kanban boards v Create kanban boards');
	var card3 = new Card('Create kanban boards Create kanban boards Create kanban boards v Createerr kanban boards Create kanban boards v Create kanban boards');

	// ADDING CARDS TO COLUMNS
	mustColumn.addCard(card1);
	shouldColumn.addCard(card2);
	shouldColumn.addCard(card3);
})