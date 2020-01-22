import React from 'react'; 
import { 
	View, 
	Text, 
	StyleSheet, 
	SectionList, 
	FlatList, 
	Slider, 
	Switch
} from 'react-native'; 
import { Entypo } from '@expo/vector-icons';

import Header from './Header'; 

const DATA = [
	{
		title: 'ACCOUNT', 
		data: [
			{
				title: 'Phone', 
				data: '12345678'
			}, 
			{
				title: 'Email', 
				data: 'abcde@gmail.com'
			}
		]
	}, 
	{
		title: 'DISCOVERY', 
		data: [
			{
				title: 'Location', 
				data: 'My Location'
			}, 
			{
				title: 'Max Distance', 
				data: '0 km'
			}, 
			{
				title: 'Show Me', 
				data: 'Male'
			}, 
			{
				title: 'Age', 
				data: '18-60'
			}
		]
	}, 
	{
		title: '', 
		data: [
			{
				title: 'Show Me on App', 
				data: 'yes'
			}
		]
	}
]

export default function Settings(props) {
	const { slideOut } = props; 

	return (
		<View style={styles.container}>
			<Header 
				title='Settings'
				done={slideOut} 
			/>
			<SectionList 
				keyExtractor={(item, index) => item + index}
				sections={DATA}
		        renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
		        renderItem={({ item }) => {
		        	switch(item.title) {
		        		case 'Location': 
		        			return (
		        				<Item 
		        					item={item}
		        					RightComponent={<Text style={styles.item_data}>{item.data}</Text>}
		        					BottomComponent={<Text style={styles.item_data}>Todo: fetch location</Text>}
		        				/>
	        				)
        				case 'Max Distance': 
        					return (
        						<Item
        							item={item}
        							routing={false}
        							RightComponent={<Text style={styles.item_data}>Todo: slider value</Text>}
		        					BottomComponent={
		        						<Slider 
		        							styel={styles.item_bottom}
		        							minimumValue={0}
										    maximumValue={1}
										    minimumTrackTintColor="red"
										    maximumTrackTintColor="lightgrey"
										/>
									}
        						/>
    						)
						case 'Show Me on App': 
							return (
								<Item
        							item={item}
        							routing={false}
        							RightComponent={
        								<Switch 
        									trackColor={{true: 'red', false: 'grey'}}
        									style={styles.item_data}
        									value={true}
        									
    									/>
        							}
        						/>
							)
		        		default: 
		        			return (
		        				<Item item={item} />
			    			)
		        	}
        			
        		}}
			/>
		</View>
	)
}


function Item2({ section, routing=true, LeftComponent, RightComponent, BottomComponent }) {
	const { title, data } = section; 

	return (
		<View style={styles.item_container}>
			<View style={styles.item_panel_container}>
	    		<View style={styles.item_panel_cols}>
	    			<View style={styles.item_panel}>
	    				<View style={styles.item}>
		    				{ LeftComponent ? <LeftComponent item={item} /> : null }
	    				</View>
	    				<View style={styles.item}>
		    				{ RightComponent ? <RightComponent item={item} /> : null }
	    				</View>
					</View>
					{ BottomComponent ? <BottomComponent item={item} /> : null }
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
	); 
}

function Item({ item, routing=true, LeftComponent, RightComponent, BottomComponent }) {
	return (
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
	); 
}

function LeftComponent({ item }) {
	return (		
		<Text style={styles.item_title}>{item.title}</Text>
	); 
}; 

function RightComponent({ item }) {
	return (
		<Text style={styles.item_data}>{item.data}</Text>
	); 
}

function BottomComponent({ item }) {
	return (
		<View style={{flex: 1}} />
	); 
}



const styles = StyleSheet.create({
	container: {
		flex: 1
	}, 
	title: {
		paddingLeft: 15, 
		color: 'grey', 
		marginTop: 10, 
		marginBottom: 5
	}, 
	item_container: {
		backgroundColor: '#F5F5F5', 
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