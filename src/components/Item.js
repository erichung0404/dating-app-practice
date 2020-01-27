import React from 'react'; 

import { 
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity 
} from 'react-native'; 
import { Entypo } from '@expo/vector-icons';

export default function Item({ item, navigate, routing=true, LeftComponent, RightComponent, BottomComponent }) {
	return (
		<TouchableOpacity onPress={navigate} disabled={!routing}>
			<View style={styles.item_container}>
				<View style={styles.item_panel_container}>
		    		<View style={styles.item_panel_cols}>
		    			<View style={styles.item_panel}>
		    				<View style={styles.item}>
			    				{ LeftComponent ? LeftComponent : <Text style={styles.item_title}>{item.title}</Text> }
		    				</View>
		    				<View style={styles.item}>
			    				{ RightComponent ? RightComponent : <Text style={styles.item_data}>{item.data}</Text> }
		    				</View>
						</View>
						{ BottomComponent ? BottomComponent : null }
					</View>
					{
						routing ? 
							<Entypo
								name={'chevron-right'}
								size={20}
								style={styles.icon}
							/> : null
					}
				</View>
			</View>
		</TouchableOpacity>
	); 
}

const styles = StyleSheet.create({
	item_container: {
		backgroundColor: 'white', 
		minHeight: 50
	}, 
	item_panel_container: {
		flex: 1, 
		flexDirection: 'row', 
		width: '95%', 
		alignSelf: 'flex-end', 
		borderBottomColor: 'lightgrey', 
		borderBottomWidth: 1, 
		marginRight: 5
	}, 
	item_panel_cols: {
		flex: 1, 
		justifyContent: 'center', 
		marginRight: 5
	}, 
	item_panel: {
		flex: 1, 
		flexDirection: 'row'
	}, 
	item: {
		flex: 1, 
		flexDirection: 'column', 
		justifyContent: 'center'
	}, 
	item_title: {
		fontSize: 18, 
		alignSelf: 'flex-start'
	}, 
	item_data: {
		alignSelf: 'flex-end', 
		paddingRight: 5, 
		fontSize: 18, 
		color: 'grey'
	}, 
	item_bottom: {
		flex: 1
	}, 
	icon: {
		alignSelf: 'center', 
		paddingRight: 5, 
		color: 'lightgrey'
	}
})