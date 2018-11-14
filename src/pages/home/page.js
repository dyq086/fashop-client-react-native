import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text
} from 'react-native';
import { connect } from "react-redux";
import { getHomeView } from "../../actions/home";
import { stateHoc } from "../../utils";
import SafeAreaView from "react-native-safe-area-view";
import { PublicStyles } from '../../utils/publicStyleModule';
import {
    Goods,
    GoodsList,
    GoodsSearch,
    Separator,
    AuxiliaryBlank,
    ImageAds,
    ImageNav,
    ShopWindow,
    Video,
    TopMenu,
    Title,
    TextNav,
} from "../../components/page"

@connect(({
    View: {
        home: {
            homeView,
            homeViewFetchStatus,
        }
    }
}) => ({
    homeView,
    fetchStatus: homeViewFetchStatus,
}))
@stateHoc()
export default class HomeIndex extends Component {
    hocComponentDidMount() {
        this.props.dispatch(getHomeView())
    }
    render() {
        const { homeView } = this.props
        const { background_color, name, body } = homeView
        return <View
            style={[
                PublicStyles.ViewMax, {
                    backgroundColor: background_color
                }
            ]}
        >
            <SafeAreaView style={styles.titleWarp}>
                <Text style={styles.title}>{name}</Text>
            </SafeAreaView>
            <ScrollView>
                {
                    body.map((item,index)=> this.bodyItem(item,index))
                }
            </ScrollView>
        </View>
    }
    handelLink(link) {
        // link.action = portal 首页
        // link.action = goods 商品 param { id: 10000 }
        // link.action = page 页面 param { id: 'slfkf2dc' }
        // link.action = url 页面 param { url: 'http://fashop.cn' }
        // switch (link.action) {
        //     case 'portal':
        //         wx.switchTab({
        //             url: '/pages/index/index'
        //         })
        //         break
        //     case 'goods':
        //         wx.navigateTo({
        //             url: `/pages/goods/detail/index?id=${link.param.id}`
        //         })
        //         break
        //     case 'page':
        //         wx.navigateTo({
        //             url: `/pages/page/index?id=${link.param.id}`
        //         })
        //         break
        // }
    }
    bodyItem(item,index){
        const { navigation } = this.props;
        switch (item.type) {
            case "goods":
                return <Goods key={index} data={item} navigation={navigation} />;
            case "goods_list":
                return <GoodsList key={index} data={item} navigation={navigation} />;
            case "goods_search":
                return <GoodsSearch 
                    key={index} 
                    data={item} 
                    goGoodsList={() => navigation.navigate("GoodsList", {
                        autoFocus: true
                    })} 
                />;
            case "separator":
                return <Separator key={index} data={item} />;
            case "auxiliary_blank":
                return <AuxiliaryBlank key={index} data={item} />;
            case "image_ads":
                return <ImageAds key={index} data={item} />;
            case "image_nav":
                return <ImageNav key={index} data={item} />;
            case "shop_window":
                return <ShopWindow key={index} data={item} />;
            case "video":
                return <Video key={index} data={item} />;
            case "top_menu":
                return <TopMenu key={index} data={item} />;
            case "title":
                return <Title key={index} data={item} />;
            case "text_nav":
                return <TextNav key={index} data={item} />;
            default:
                return <Text key={index}>NULL</Text>;
        }
    }
}

const styles = StyleSheet.create({
    titleWarp: {
        backgroundColor: '#fff'
    },
    title: {
        lineHeight: 44,
        fontSize: 17,
        color: '#000',
        fontWeight: '700',
        textAlign: 'center'
    },
});