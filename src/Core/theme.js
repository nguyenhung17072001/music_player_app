
const font = {
  regular: "SVNGilroy-Regular",

  bold: "SVNGilroy-Bold",
  italic:"SVNGilroy-Italic",
  boldItlaic:"SVNGilroy-BoldItalic",
  medium: "SVNGilroy-Medium"
}
const colors = { 
  
  mainBackgroundColor: '#228B22',
  orangetheme:'#FF7466',
  orangeBackgroundColor:'#FFF5EA',
  mainText: 'black',
  formColor: '#D8E3E4',
  placeholderTextColor: "#506D85",

  bluetheme:'#00a651',
  lightBlue: '#14BFFF',
  activethemeborder:'red',
  orderTrackColor:'#EAE7E7',
  shippingAdressColor:'#BCBCBC',
  white: 'white',
  App_Name_Color:'white',
  carouselLine:'#C0C0C0',
  
  
}
const icons = {
  ic_doc: require("../assets/icons/ic_doc.png"),
  ic_image: require("../assets/icons/ic_image.png"),
  ic_pdf: require("../assets/icons/ic_pdf.png"),
  ic_ppt: require("../assets/icons/ic_ppt.png"),
  ic_search_file: require("../assets/icons/ic_search_file.png"),
  ic_txt: require("../assets/icons/ic_txt.png"),
  ic_xls: require("../assets/icons/ic_xls.png"),
  icon_all: require("../assets/icons/icon_all.png"),
  
}
const images = {
  vietnam: require("../assets/images/vietnam.png"),
  english: require("../assets/images/english.png"),
}



const strings = {
  vietnam: {
    themeselection:"",
    app_name: "",
    brand_name: "",
  },
  english: {
    themeselection:"",
    app_name: "",
    brand_name: "",
  }
  
}

export default { font, icons, strings, colors, images }
