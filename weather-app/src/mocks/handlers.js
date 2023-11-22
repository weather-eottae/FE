import { http, HttpResponse } from "msw";

// 현재 로그인된 사용자 mockdata
const currentUser = {
  userId: "jtmmg",
  userImg:
    "https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_640.jpg",
};

// 피드 mockdata
const feeds = [
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/02/04/12/49/woman-6992691_640.jpg",
    userId: "abc_123",
    date: "2023-11-11 22:19:12",
    location: "서울시 강남구",
    temperature: 21,
    postId: "1",
    imgs: [
      "https://cdn.pixabay.com/photo/2018/10/06/11/22/coffee-3727673_640.jpg",
      "https://cdn.pixabay.com/photo/2017/08/01/08/16/couple-2563424_640.jpg",
      "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_640.jpg",
    ],
    heartCount: 3,
    text: "커피 좋아! 커피 최고!",
    tags: ["#커피", "#카페"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/07/11/00/02/mango-smoothie-8119280_640.jpg",
    userId: "aaa_111",
    date: "2023-11-06 18:45:29",
    location: "부산 해운구",
    temperature: 22,
    postId: "2",
    imgs: [
      "https://cdn.pixabay.com/photo/2013/12/17/01/41/haeundae-beach-229490_1280.jpg",
      "https://cdn.pixabay.com/vimeo/176282263/4006.mp4?width=640&hash=f116cbd22359c2ce9290712bf2bfe4806af7a597",
    ],
    heartCount: 4,
    text: "2박 3일 부산 여행! 23.10.24 - 23.10.26",
    tags: ["#여행", "#부산", "#해운대", "#바다"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
    userId: "eee_555",
    date: "2023-10-26 13:35:39",
    location: "경상남도 창원",
    temperature: 25,
    postId: "3",
    imgs: [
      "https://cdn.pixabay.com/photo/2019/06/25/06/02/woman-4297471_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
    userId: "abc_111",
    date: "2023-10-25 14:35:39",
    location: "전라북도 전주시",
    temperature: 22,
    postId: "4",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/02/28/12/40/bibimbap-4887394_640.jpg",
      "https://cdn.pixabay.com/photo/2023/02/27/13/57/traditional-village-7818476_640.jpg",
      "https://cdn.pixabay.com/vimeo/764361560/135669.mp4?width=1280&hash=ee82fe7ba4c88556bd0fe927ec669c5342540bf5",
    ],
    heartCount: 3,
    text: "2박 3일 전주 여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다!전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행",
    tags: ["#전주", "#여행", "#비빔밥"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
    userId: "gasga_fwewg",
    date: "2023-10-25 09:52:33",
    location: "경상북도 경주시",
    temperature: 29,
    postId: "5",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/12/01/09/07/womens-5793436_640.jpg",
      "https://cdn.pixabay.com/photo/2015/08/10/16/55/buddhism-882879_1280.jpg",
    ],
    heartCount: 5,
    text: "경주로 놀러갔다. 초등학생 때 이후로 처음 왔다. ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ 한복도 입었다.",
    tags: ["#여행", "#경주", "#석굴암", "#불국사", "#한복"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
    userId: "hsdf_234_dsfg",
    date: "2023-10-24 13:35:39",
    location: "인천광역시 중구",
    temperature: 30,
    postId: "6",
    imgs: [
      "https://player.vimeo.com/external/449961163.sd.mp4?s=ae3eb4725cd2f17affdf28f2f676391a80eadf3b&profile_id=165&oauth2_token_id=57447761",
      "https://cdn.pixabay.com/photo/2023/07/06/15/07/swim-8110683_640.jpg",
    ],
    heartCount: 5,
    text: "가족들이랑 수영장 있는 호텔로 호캉스 갔다. 날씨 엄청 더운데 시원하다! ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    tags: ["#수영장", "#가족", "#호캉스"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/26/06/45/bride-8276620_640.jpg",
    userId: "gsa_124_222",
    date: "2023-10-22 23:35:39",
    location: "서울시 마포구",
    temperature: 30,
    postId: "7",
    imgs: [
      "https://cdn.pixabay.com/photo/2023/06/02/21/24/portrait-8036356_640.jpg",
    ],
    heartCount: 2,
    text: "아아아아아아앙ㄻ니ㅏ룸ㄴ우래ㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#패션", "#잡지", "#첼시부츠"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/08/12/18/28/woman-7382243_640.png",
    userId: "koiej_8883",
    date: "2023-10-21 17:52:12",
    location: "서울시 마포구",
    temperature: 32,
    postId: "8",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/11/25/14/38/girl-5775940_640.jpg",
      "https://cdn.pixabay.com/vimeo/400954475/34203.mp4?width=640&hash=3ee2d2c57a6165f48eeab381c9e89e4dda012760",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "ㅎㅁㄴㄴㅇㅎㅁㄴㄻㄴㅇㄻㄴㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#카페", "#커피", "#ootd"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
    userId: "jtems_98u3",
    date: "2023-10-20 17:52:12",
    location: "서울시 노원구",
    temperature: 30,
    postId: "9",
    imgs: [
      "https://cdn.pixabay.com/photo/2022/06/21/23/11/asian-7276658_640.jpg",
      "https://cdn.pixabay.com/photo/2014/07/21/17/52/museum-398761_640.jpg",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "북서울 미술관에 전시회 보러 갔다왔다.ㅇㄴㄻㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#전시회", "#미술관", "#ootd", "#북서울미술관"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/21/16/44/moon-8267178_640.jpg",
    userId: "nuel__23_sdf",
    date: "2023-10-19 15:24:40",
    location: "서울시 종로구",
    temperature: 34,
    postId: "10",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/09/20/14/08/woman-5587219_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/02/04/12/49/woman-6992691_640.jpg",
    userId: "abc_123",
    date: "2023-10-18 18:35:22",
    location: "서울시 강남구",
    temperature: 21,
    postId: "11",
    imgs: [
      "https://cdn.pixabay.com/photo/2018/10/06/11/22/coffee-3727673_640.jpg",
      "https://cdn.pixabay.com/photo/2017/08/01/08/16/couple-2563424_640.jpg",
      "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_640.jpg",
    ],
    heartCount: 3,
    text: "20번 data - 2번째 반복시작이다!!!!!: 커피 좋아! 커피 최고!",
    tags: ["#커피", "#카페"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/07/11/00/02/mango-smoothie-8119280_640.jpg",
    userId: "aaa_111",
    date: "2023-10-18 18:45:29",
    location: "부산 해운구",
    temperature: 22,
    postId: "12",
    imgs: [
      "https://cdn.pixabay.com/photo/2013/12/17/01/41/haeundae-beach-229490_1280.jpg",
      "https://cdn.pixabay.com/vimeo/176282263/4006.mp4?width=640&hash=f116cbd22359c2ce9290712bf2bfe4806af7a597",
    ],
    heartCount: 4,
    text: "2박 3일 부산 여행! 23.10.24 - 23.10.26",
    tags: ["#여행", "#부산", "#해운대", "바다"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
    userId: "eee_555",
    date: "2023-10-17 13:35:39",
    location: "경상남도 창원",
    temperature: 25,
    postId: "13",
    imgs: [
      "https://cdn.pixabay.com/photo/2019/06/25/06/02/woman-4297471_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
    userId: "abc_111",
    date: "2023-10-16 14:35:39",
    location: "전라북도 전주시",
    temperature: 22,
    postId: "14",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/02/28/12/40/bibimbap-4887394_640.jpg",
      "https://cdn.pixabay.com/photo/2023/02/27/13/57/traditional-village-7818476_640.jpg",
      "https://cdn.pixabay.com/vimeo/764361560/135669.mp4?width=1280&hash=ee82fe7ba4c88556bd0fe927ec669c5342540bf5",
    ],
    heartCount: 3,
    text: "2박 3일 전주 여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행",
    tags: ["#전주", "#여행", "#비빔밥"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
    userId: "gasga_fwewg",
    date: "2023-10-15 09:52:33",
    location: "경상북도 경주시",
    temperature: 29,
    postId: "15",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/12/01/09/07/womens-5793436_640.jpg",
      "https://cdn.pixabay.com/photo/2015/08/10/16/55/buddhism-882879_1280.jpg",
    ],
    heartCount: 5,
    text: "경주로 놀러갔다. 초등학생 때 이후로 처음 왔다. ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ 한복도 입었다.",
    tags: ["#여행", "#경주", "#석굴암", "#불국사", "#한복"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
    userId: "hsdf_234_dsfg",
    date: "2023-10-14 13:35:39",
    location: "인천광역시 중구",
    temperature: 30,
    postId: "16",
    imgs: [
      "https://cdn.pixabay.com/vimeo/351374270/25639.mp4?width=1280&hash=6e8d99c1bba0ad72cec88dd411e0cc241536e4bc",
      "https://cdn.pixabay.com/photo/2023/07/06/15/07/swim-8110683_640.jpg",
    ],
    heartCount: 5,
    text: "가족들이랑 수영장 있는 호텔로 호캉스 갔다. 날씨 엄청 더운데 시원하다! ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    tags: ["#수영장", "#가족", "#호캉스"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/26/06/45/bride-8276620_640.jpg",
    userId: "gsa_124_222",
    date: "2023-10-13 23:35:39",
    location: "서울시 마포구",
    temperature: 30,
    postId: "17",
    imgs: [
      "https://cdn.pixabay.com/photo/2023/06/02/21/24/portrait-8036356_640.jpg",
    ],
    heartCount: 2,
    text: "아아아아아아앙ㄻ니ㅏ룸ㄴ우래ㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#패션", "#잡지", "#첼시부츠"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/08/12/18/28/woman-7382243_640.png",
    userId: "koiej_8883",
    date: "2023-10-11 17:52:12",
    location: "서울시 마포구",
    temperature: 32,
    postId: "18",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/11/25/14/38/girl-5775940_640.jpg",
      "https://cdn.pixabay.com/vimeo/400954475/34203.mp4?width=640&hash=3ee2d2c57a6165f48eeab381c9e89e4dda012760",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "ㅎㅁㄴㄴㅇㅎㅁㄴㄻㄴㅇㄻㄴㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#카페", "#커피", "#ootd"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
    userId: "jtems_98u3",
    date: "2023-10-10 17:52:12",
    location: "서울시 노원구",
    temperature: 30,
    postId: "19",
    imgs: [
      "https://cdn.pixabay.com/photo/2022/06/21/23/11/asian-7276658_640.jpg",
      "https://cdn.pixabay.com/photo/2014/07/21/17/52/museum-398761_640.jpg",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "북서울 미술관에 전시회 보러 갔다왔다.ㅇㄴㄻㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#전시회", "#미술관", "#ootd", "#북서울미술관"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/21/16/44/moon-8267178_640.jpg",
    userId: "nuel__23_sdf",
    date: "2023-10-09 15:24:40",
    location: "서울시 종로구",
    temperature: 34,
    postId: "20",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/09/20/14/08/woman-5587219_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/02/04/12/49/woman-6992691_640.jpg",
    userId: "abc_123",
    date: "2023-10-08 18:35:22",
    location: "서울시 강남구",
    temperature: 21,
    postId: "21",
    imgs: [
      "https://cdn.pixabay.com/photo/2018/10/06/11/22/coffee-3727673_640.jpg",
      "https://cdn.pixabay.com/photo/2017/08/01/08/16/couple-2563424_640.jpg",
      "https://cdn.pixabay.com/photo/2016/11/30/14/08/cafe-1872888_640.jpg",
    ],
    heartCount: 3,
    text: "30번 data - 3번째 반복 시작이다!!!!! 커피 좋아! 커피 최고!",
    tags: ["#커피", "#카페"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/07/11/00/02/mango-smoothie-8119280_640.jpg",
    userId: "aaa_111",
    date: "2023-10-08 18:45:29",
    location: "부산 해운구",
    temperature: 22,
    postId: "22",
    imgs: [
      "https://cdn.pixabay.com/photo/2013/12/17/01/41/haeundae-beach-229490_1280.jpg",
      "https://cdn.pixabay.com/vimeo/176282263/4006.mp4?width=640&hash=f116cbd22359c2ce9290712bf2bfe4806af7a597",
    ],
    heartCount: 4,
    text: "2박 3일 부산 여행! 23.10.24 - 23.10.26",
    tags: ["#여행", "#부산", "#해운대", "바다"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
    userId: "eee_555",
    date: "2023-10-07 13:35:39",
    location: "경상남도 창원",
    temperature: 25,
    postId: "23",
    imgs: [
      "https://cdn.pixabay.com/photo/2019/06/25/06/02/woman-4297471_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
    userId: "abc_111",
    date: "2023-10-05 14:35:39",
    location: "전라북도 전주시",
    temperature: 22,
    postId: "24",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/02/28/12/40/bibimbap-4887394_640.jpg",
      "https://cdn.pixabay.com/photo/2023/02/27/13/57/traditional-village-7818476_640.jpg",
      "https://cdn.pixabay.com/vimeo/764361560/135669.mp4?width=1280&hash=ee82fe7ba4c88556bd0fe927ec669c5342540bf5",
    ],
    heartCount: 3,
    text: "2박 3일 전주 여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행 오랜만에 여행갔다! 전라북도 전주여행",
    tags: ["#전주", "#여행", "#비빔밥"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
    userId: "gasga_fwewg",
    date: "2023-10-05 09:52:33",
    location: "경상북도 경주시",
    temperature: 29,
    postId: "25",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/12/01/09/07/womens-5793436_640.jpg",
      "https://cdn.pixabay.com/photo/2015/08/10/16/55/buddhism-882879_1280.jpg",
    ],
    heartCount: 5,
    text: "경주로 놀러갔다. 초등학생 때 이후로 처음 왔다. ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ 한복도 입었다.",
    tags: ["#여행", "#경주", "#석굴암", "#불국사", "#한복"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
    userId: "hsdf_234_dsfg",
    date: "2023-10-04 13:35:39",
    location: "인천광역시 중구",
    temperature: 30,
    postId: "26",
    imgs: [
      "https://cdn.pixabay.com/vimeo/351374270/25639.mp4?width=1280&hash=6e8d99c1bba0ad72cec88dd411e0cc241536e4bc",
      "https://cdn.pixabay.com/photo/2023/07/06/15/07/swim-8110683_640.jpg",
    ],
    heartCount: 5,
    text: "가족들이랑 수영장 있는 호텔로 호캉스 갔다. 날씨 엄청 더운데 시원하다! ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ",
    tags: ["#수영장", "#가족", "#호캉스"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/26/06/45/bride-8276620_640.jpg",
    userId: "gsa_124_222",
    date: "2023-10-03 23:35:39",
    location: "서울시 마포구",
    temperature: 30,
    postId: "27",
    imgs: [
      "https://cdn.pixabay.com/photo/2023/06/02/21/24/portrait-8036356_640.jpg",
    ],
    heartCount: 2,
    text: "아아아아아아앙ㄻ니ㅏ룸ㄴ우래ㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#패션", "#잡지", "#첼시부츠"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2022/08/12/18/28/woman-7382243_640.png",
    userId: "koiej_8883",
    date: "2023-10-02 17:52:12",
    location: "서울시 마포구",
    temperature: 32,
    postId: "28",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/11/25/14/38/girl-5775940_640.jpg",
      "https://cdn.pixabay.com/vimeo/400954475/34203.mp4?width=640&hash=3ee2d2c57a6165f48eeab381c9e89e4dda012760",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "ㅎㅁㄴㄴㅇㅎㅁㄴㄻㄴㅇㄻㄴㅑㅁㄴ우ㅐ러ㅐㅑㄴ멍러ㅐㅁㄴ애햐ㅐㅑㅁㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#카페", "#커피", "#ootd"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
    userId: "jtems_98u3",
    date: "2023-10-02 17:52:12",
    location: "서울시 노원구",
    temperature: 30,
    postId: "29",
    imgs: [
      "https://cdn.pixabay.com/photo/2022/06/21/23/11/asian-7276658_640.jpg",
      "https://cdn.pixabay.com/photo/2014/07/21/17/52/museum-398761_640.jpg",
      "https://cdn.pixabay.com/photo/2020/08/17/14/37/coffee-5495609_640.jpg",
    ],
    heartCount: 3,
    text: "북서울 미술관에 전시회 보러 갔다왔다.ㅇㄴㄻㄴ어햐ㅓㅐㅑㅁㄴ어ㅐㅑ르ㅐㅑㅁㄴ으램내ㅑㅓㅇ래ㅑㅓㅁ내ㅑ어래ㅑㅁ너래ㅑㅇㄴ어ㅑ팸너애랴ㅓㅐㅑㄴ러ㅐㅑㅁ넝랸먀ㅓㅇ램ㄴ얼ㄴ멍래ㅑ",
    tags: ["#전시회", "#미술관", "#ootd", "#북서울미술관"],
  },
  {
    userImg:
      "https://cdn.pixabay.com/photo/2023/09/21/16/44/moon-8267178_640.jpg",
    userId: "nuel__23_sdf",
    date: "2023-10-01 15:24:40",
    location: "서울시 종로구",
    temperature: 34,
    postId: "30",
    imgs: [
      "https://cdn.pixabay.com/photo/2020/09/20/14/08/woman-5587219_640.jpg",
    ],
    heartCount: 0,
    text: "",
    tags: [],
  },
];

// 좋아요 유저목록 mockdata
const heartsData = [
  {
    postId: "1",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/07/11/00/02/mango-smoothie-8119280_640.jpg",
        userId: "aaa_111",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "2",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
    ],
  },
  {
    postId: "3",
    userList: [],
  },
  {
    postId: "4",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
    ],
  },
  {
    postId: "5",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "6",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "7",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "8",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
    ],
  },
  {
    postId: "9",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "10",
    userList: [],
  },
  {
    postId: "11",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "12",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
    ],
  },
  {
    postId: "13",
    userList: [],
  },
  {
    postId: "14",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
    ],
  },
  {
    postId: "15",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "16",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "17",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "18",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
    ],
  },
  {
    postId: "19",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "20",
    userList: [],
  },
  {
    postId: "21",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
        userId: "hsdf_234_dsfg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "22",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/10/02/14/51/flowers-8289321_640.png",
        userId: "hsdf_234_dsfg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
    ],
  },
  {
    postId: "23",
    userList: [],
  },
  {
    postId: "24",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
        userId: "gasga_fwewg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
    ],
  },
  {
    postId: "25",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/01/13/15/03/mirror-1138098_640.jpg",
        userId: "eee_555",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "26",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2017/09/01/12/52/girl-2704119_640.jpg",
        userId: "ddd_444",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
        userId: "gasga_fwewg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "27",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
        userId: "gasga_fwewg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2023/09/20/04/04/sea-urchin-8263832_640.jpg",
        userId: "abc_111",
      },
    ],
  },
  {
    postId: "28",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
        userId: "gasga_fwewg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/09/18/16/34/shenzhen-1678546_640.jpg",
        userId: "jtems_98u3",
      },
    ],
  },
  {
    postId: "29",
    userList: [
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_640.jpg",
        userId: "gasga_fwewg",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2016/11/25/23/15/moon-1859616_640.jpg",
        userId: "bbb_222",
      },
      {
        userImg:
          "https://cdn.pixabay.com/photo/2018/10/07/00/46/surfer-3729052_640.jpg",
        userId: "ccc_333",
      },
    ],
  },
  {
    postId: "30",
    userList: [],
  },
];

export const handlers = [
  // 전체 피드 조회 GET
  http.get("/api/feed/posts", () => {
    return HttpResponse.json(feeds);
  }),

  // 해당 피드에 좋아요 누른 유저목록 GET
  http.get("/api/feed/posts/:postId/hearts", ({ params }) => {
    const { postId } = params;
    const heartsEntry = heartsData.find((entry) => entry.postId === postId);
    if (!heartsEntry) {
      return HttpResponse.error("Post not found", { status: 404 });
    }
    return HttpResponse.json(heartsEntry);
  }),

  // 좋아요 등록 POST
  http.post("/api/feed/posts/:postId/hearts", ({ params }) => {
    const { postId } = params;

    const feed = feeds.find((f) => f.postId === postId);
    if (!feed) {
      return HttpResponse.error("Post not found", { status: 404 });
    }
    feed.heartCount += 1;

    let heartsEntry = heartsData.find((entry) => entry.postId === postId);
    if (!heartsEntry) {
      heartsEntry = { postId, userList: [] };
      heartsData.push(heartsEntry);
    }

    // 현재 로그인된 사용자를 userList에 추가
    heartsEntry.userList.push({
      userImg: currentUser.userImg,
      userId: currentUser.userId,
    });

    return HttpResponse.json({
      heartCount: feed.heartCount,
      userList: heartsEntry.userList,
    });
  }),

  // 좋아요 취소 DELETE
  http.delete("/api/feed/posts/:postId/hearts", ({ params }) => {
    const { postId } = params;

    const feed = feeds.find((f) => f.postId === postId);
    if (!feed) {
      return HttpResponse.error("Post not found", { status: 404 });
    }

    if (feed.heartCount > 0) {
      feed.heartCount -= 1;
    }

    const heartsEntry = heartsData.find((entry) => entry.postId === postId);
    if (heartsEntry) {
      heartsEntry.userList = heartsEntry.userList.filter(
        (u) => u.userId !== currentUser.userId
      );
    }

    // return HttpResponse.json(heartsEntry);
    return HttpResponse.json({
      heartCount: feed.heartCount,
      userList: heartsEntry.userList,
    });
  }),

  // 특정 유저의 피드 조회 GET
  http.get("/api/feed/posts/:userId", ({ params }) => {
    const { userId } = params;
    const userFeeds = feeds.filter((feed) => feed.userId === userId);
    const userImg = userFeeds.length > 0 ? userFeeds[0].userImg : null;
    return HttpResponse.json({ userFeeds, userImg });
  }),

  // 특정 태그의 피드 조회 GET
  http.get("/api/feed/posts/hashtags/:tag", ({ params }) => {
    const { tag } = params;
    const tagFeeds = feeds.filter((feed) => feed.tags.includes(`#${tag}`));
    return HttpResponse.json(tagFeeds);
  }),
];
