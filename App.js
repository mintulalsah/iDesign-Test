
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import {
    Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,TextInput,Image, ToastAndroid, Settings
} from 'react-native';
function App(){
  var listofpurchaseitem=[];
const [data, setdata] = useState([]);
const [tempdata, setTempdata] = useState([]);
const [orderdata, setOrderdata] = useState([]);
const [pricedata, setPricedata] = useState(0);
const [searchtext, setSearchtext] = useState('');
const [filterdata, setFilterdataByCat] = useState([]);
const [listofcat, setCatlist] = useState(["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration", "furniture", "tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses", "automotive", "motorcycle", "lighting"])
const [listofbrand, setBrandlist] = useState(["Apple", "Samsung", "OPPO", "Huawei", "APPle", "Microsoft Surface", "Infinix", "HP Pavilion", "Impression of Acqua Di Gio", "Royal_Mirage", "Fog Scent Xpressio", "Al Munakh", "Lord - Al-Rehab", "L'Oreal Paris", "Hemani Tea", "Dermive", "ROREC White Rice", "Fair & Clear", "Saaf & Khaas", "Bake Parlor Big", "Baking Food Items", "fauji", "Dry Rose", "Boho Decor", "Flying Wooden", "LED Lights", "luxury palace", "Golden", "Furniture Bed Set", "Ratttan Outdoor", "Kitchen Shelf", "Multi Purpose", "AmnaMart", "Professional Wear", "Soft Cotton", "Top Sweater", "RED MICKY MOUSE..", "Digital Printed", "Ghazi Fabric", "IELGY", "IELGY fashion", "Synthetic Leather", "Sandals Flip Flops", "Maasai Sandals", "Arrivals Genuine", "Vintage Apparel", "FREE FIRE", "The Warehouse", "Sneakers", "Rubber", "Naviforce", "SKMEI 9117", "Strap Skeleton", "Stainless", "Eastern Watches", "Luxury Digital", "Watch Pearls", "Bracelet", "LouisWill", "Copenhagen Luxe", "Steal Frame", "Darojay", "Fashion Jewellery", "Cuff Butterfly", "Designer Sun Glasses", "mastar watch", "Car Aux", "W1209 DC12V", "TC Reusable", "Neon LED Light", "METRO 70cc Motorcycle - MR70", "BRAVE BULL", "shock absorber", "JIEPOLLY", "Xiangle", "lightingbrilliance", "Ifei Home", "DADAWU", "YIOSI"])
const [sortby, setSort] = useState(['rating','discount','price']);
const [catName, setcatName] = useState([])
const [inputText, setInputText] = useState('');
useEffect(() => {
    async function fetchData() {
        const response=await fetch("https://dummyjson.com/products?limit=100");
        const responseinJson=await response.json();
        setdata(responseinJson.products)
        setTempdata(responseinJson.products)
    }
    fetchData();

     filterallCategory();
  }, []);

  const filterallCategory=async()=>{
    var allcatmix=[];
    for(let i=0;i<data.length;i++){
         if(allcatmix.length==0){
            console.log("called")
            allcatmix.push(data[i].brand)
        }
       
       else{
         allcatmix.push(data[i].brand)
    }};
   //const arrayofCategory=[...new Set(allcatmix)];
  //setcatName([...new Set(allcatmix)]);
/*  await setcatName(allcatmix.filter((c, index) => {
    return allcatmix.indexOf(c) === index;
}))  */
console.log([...new Set(allcatmix)]);
  }

  const filterbyCat=()=>{
var filterdata=data.filter((item)=>{
    return item.category=="smartphones";
});
setFilterdataByCat(filterdata)
  }

  // sort by
const sortarrayBy=(p1)=>{
  var sortedarray=tempdata.sort(function(a, b){
    return a[p1] - b[p1]
});
setTempdata(sortedarray);
console.log("sortarrayby called")
}

//search filter
const searchFilter = (inputValue) => {
    setInputText(inputValue);
    var filterArr = data.filter(element => {
      return element.category.toLowerCase().includes(inputValue.toLowerCase())||element.brand.toLowerCase().includes(inputValue.toLowerCase());
    });
setTempdata(filterArr)
if(filterArr.length==0){
  ToastAndroid.showWithGravity(
    "no matches found",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
}
else{
  ToastAndroid.showWithGravity(
    filterArr.length+" matches found",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
}
  };

 // increat item
const increaseCount=(index,idis)=>{
  console.log("price is : "+tempdata[index].price)
  if(tempdata[index].noOfitems>=0){
    console.log("1 if")
   // tempdata[index].noOfitems=tempdata[index].noOfitems+1;
   setTempdata(prevState => {
    const newState = prevState.map(obj => {
      // 👇️ if id equals 2, update country property
      if (obj.id === idis) {
        setPricedata(prevPrice=>prevPrice+tempdata[index].price)
        return {...obj, noOfitems: prevState[index].noOfitems+1};
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    return newState;
  });
  //
 
  console.log(tempdata[index])
  }
 
 else{
  console.log("else")
  setTempdata(prevState => {
    const newState = prevState.map(obj => {
      // 👇️ if id equals 2, update country property
      if (obj.id === idis) {
        setPricedata(prevPrice=>prevPrice+tempdata[index].price)
        return {...obj, noOfitems:1};
      }
      // 👇️ otherwise return object as is
      return obj;
    });

    return newState;
  });

 }
 console.log("price is"+tempdata[index].price)
 console.log(pricedata)
}
 //decrease item
 const decreaseCount=(index,idis)=>{
  
  //console.log(tempdata[index].noOfitems)
  if(tempdata[index].noOfitems>0){
    console.log("1 if")
   // tempdata[index].noOfitems=tempdata[index].noOfitems+1;
   setTempdata(prevState => {
    const newState = prevState.map(obj => {
      // 👇️ if id equals 2, update country property
      if (obj.id === idis) {
        setPricedata(prevPrice=>prevPrice-tempdata[index].price)
        return {...obj, noOfitems: prevState[index].noOfitems-1};
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    return newState;
  });
  //
  console.log(tempdata[index].price)
  }
 
 else{
  ToastAndroid.showWithGravity(
    "invallid inputs",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
  console.log(tempdata[index])
 }
 } 
    return(
        <View style={{flex:1,backgroundColor:'#B6B8B9',}}>
<View style={{flexDirection:'row'}}>
             <View style={{
            backgroundColor: 'white', width: '80%',
           paddingRight: 10, paddingLeft: 10
          }}>
          <TextInput
            style={{
              fontSize: 15,
              width: '80%',
              marginLeft: 20,
              color: '#000000',
            }}
            placeholder="Search by brand, category"
            keyboardType="default"
            multiline={true}
            maxLength={200}
            onChangeText={input => searchFilter(input)}
            placeholderTextColor="black"></TextInput>
        </View>
<View style={{backgroundColor:'white',justifyContent:'center',alignItems:'center',width:'20%'}}>
  <Text style={{color:'red'}}>Total Price is:Rs. {pricedata} </Text>
</View>
        </View>
<View style={{width:'100%'}}>
<Text style={{fontSize:15,color:'black'}}>sort by </Text>
    <FlatList data={sortby}
    renderItem={({item})=>
    <TouchableOpacity onPress={()=>sortarrayBy(item)}>
    <View style={{margin:4,backgroundColor:'red',borderRadius:5,padding:4}}><Text style={{color:'white'}}>{item}</Text></View>
    </TouchableOpacity>
    }
    horizontal={true}
    />
</View>

    <View style={{paddingBottom:100,margin:5}}>

    <FlatList
          data={tempdata}
          renderItem={({item,index}) => (
            <View style={{width:'100%',flexDirection:'row',backgroundColor:'white',margin:4}}>
           <View style={{justifyContent:'center',padding:10}}>
           <Image
  style={styles.logo}
source={{uri: item.thumbnail}}
/>
           </View>
           <View style={{width:'100%'}}>
<View style={{width:'100%',flex:2}}>
  <Text style={{fontSize:20,fontWeight:'bold',color:'black',padding:5}}>{item.title}</Text>
  <Text style={{fontSize:10,color:'black',padding:2}}>Ratings. {item.rating}</Text>
</View>

<View style={{width:'90%',flexDirection:'row',flex:2,justifyContent:'space-around',alignItems:'center'}}>
  <View>
  <Text style={{fontSize:10,fontWeight:'bold',color:'black',padding:5}}>Price per item Rs. {item.price}</Text>

  </View>
  <View style={{flexDirection:'row',}}>
    <TouchableOpacity onPress={()=>decreaseCount(index,item.id)}>
  <Text style={styles.itemcount}>-</Text>
  </TouchableOpacity>
  <Text style={styles.itemcount}>{item.noOfitems}</Text>
  <TouchableOpacity onPress={()=>increaseCount(index,item.id)}>
  <Text style={styles.itemcount}>+</Text>
  </TouchableOpacity>
  </View>
</View>
</View>

            </View>
            
          )}
          ></FlatList>
    </View>
    </View>
    );
  }


  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    headtext: {fontWeight: 'bold', fontSize: 15},
    deltext: {fontWeight: 'bold', fontSize: 15,color:'red'},
    userDataText: {fontWeight: '600', fontSize: 12,color:'white'},
    logo:{width:50,height:100},
    itemcount:{fontSize:25,fontWeight:'bold',color:'white',padding:10,backgroundColor:'red',margin:2}
  });
export default App;
