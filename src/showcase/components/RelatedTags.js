import React, { PropTypes, Component } from 'react'
import { 
	StyleSheet, 
	View, 
	TouchableOpacity, 
	Text, 
	ScrollView,
	Image,
} from 'react-native'
import variables, { font, layout, } from '../../styles/variables'
import LinearGradient from 'react-native-linear-gradient'

export default class RelatedTags extends Component {
	constructor(props) {
	  super(props)	
	}

	render() {

		var { 
			suggestedTags, 
			display 
		} = this.props


		/*var testData = [
        {
            "_id": "5987253a8edcdc6b78ba910c",
            "name": "scarf",
            "__v": 0,
            "category": {
                "_id": "5986c35364912624b089f1d6",
                "name": "Clothes"
            }
        },
        {
            "_id": "598725368edcdc6b78ba910b",
            "name": "shirt",
            "__v": 0,
            "category": {
                "_id": "5986c35364912624b089f1d6",
                "name": "Clothes"
            }
        },
        {
            "_id": "598725418edcdc6b78ba910d",
            "name": "shoes",
            "__v": 0,
            "category": {
                "_id": "5986c35364912624b089f1d6",
                "name": "Clothes"
            }
        },
        {
            "_id": "598725928edcdc6b78ba911d",
            "name": "tin",
            "__v": 0,
            "category": {
                "_id": "5986c35364912624b089f1d6",
                "name": "Clothes"
            }
        }
    ]*/
		return (
			<View style={[display ? styles.showContainer : styles.hideContainer, styles.container]}>
				<ScrollView automaticallyAdjustContentInsets={false}
			                horizontal={true}
			                backfaceVisibility={false}
			                showsHorizontalScrollIndicator={false}>
					{
						suggestedTags.get('tags').map((tag, i) => (
						//testData.map((tag, i) => (
							<TouchableOpacity style={[styles.tagContainer, { marginLeft: i == 0 ? 15 : 5 }]}
											  key={tag._id}
											  onPress={() => this.props.onSuggestedTagPressed(tag)}
							>
								<Image style={{ width: null, height: null, flex: 1, }}
									   borderRadius={5}
									   source={{ uri: tag.cover_url }}
								>
									<LinearGradient style={{ borderRadius: 5, flex: 1, }}
													colors={['rgba(255, 255, 255, 0.4)', 'rgba(52, 52, 52, 0.8)']}
									>
										<View style={[layout.centerCenter, { flex: 1, }]}>
											<Text style={{ fontSize: 17, fontFamily: font.heavy, color: variables.BRAND_WHITE }}>{tag.name}</Text>
										</View>
									</LinearGradient>
								</Image>
							</TouchableOpacity>
						))
					}
				</ScrollView>	
			</View>
		)
	}
}

RelatedTags.propTypes = {
	suggestedTags: PropTypes.object,
	display: PropTypes.bool,
}

RelatedTags.defaultProps = {
	display: false,
}

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		position: 'absolute',
		paddingVertical: 15,
		zIndex: 10,
		height: 100,
		backgroundColor: '#fff'
	},

	showContainer: {
		top: -100,
	},

	hideContainer: {
		top: 59,
	},

	tagContainer: {
		borderRadius: 5,
		//borderWidth: 1,
		//borderColor: variables.BRAND_SUBCOLOR1,
		//backgroundColor: variables.BRAND_SUBCOLOR1,
		//justifyContent: 'center',
		//backgroundColor: 'red',
		//alignItems: 'center',
		marginLeft: 5,
		marginRight: 5,
		//height: 80,
		width: 80,
		//padding: 10, 
		//borderRadius: 70,
	},

	tagText: {
		color: variables.BRAND_WHITE,
		fontSize: 17,
		padding: 10,
		fontFamily: font.heavy
	}
})