// ============================================================
// ACC CASE LIBRARY — Google Apps Script API
// ============================================================
// 【使い方】
// 1. Google スプレッドシートを開く
// 2. 拡張機能 → Apps Script → このコードを貼り付ける
// 3. デプロイ → 新しいデプロイ（または既存デプロイの管理 → 新しいバージョン）
//    実行するユーザー: 自分 / アクセスできるユーザー: 全員
// 4. デプロイURLをコピーして index.html / detail.html の GAS_API_URL に貼る
// ============================================================
// ★ スプレッドシートの1行目（ヘッダー行）の名前がそのままJSのキー名になります
//    列を追加・削除してもこのコードの再デプロイは不要です
// ============================================================

const SHEET_NAME = 'data';

// ============================================================
// 2021・2022年サムネイルのS3直リンク辞書
// （acc-awards.com の festival URL がリンク切れのため）
// thumbnailUrl が空 or acc-awards.com ドメインの場合に使用
// ============================================================
const S3_THUMB = {
  // ===== 2021 BCA =====
  'BA211082': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA211082/Thumbnail/BA211082_accawards_pola.jpg',
  'BA210485': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA210485/Thumbnail/BA210485_THE_FIRST_TAKE_S1.jpg',
  'BA211582': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA211582/Thumbnail/BA211582_PBL_award_thumbnail.jpg',
  'BA210928': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA210928/Thumbnail/BA210928_pc_kibo_sunrise_key_visual_1920_1080.jpg',
  'BA211086': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA211086/Thumbnail/BA211086_n10-thumnail-001.jpg',
  'BA211679': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA211679/Thumbnail/BA211679_BA211679_YAKUSHIMA.jpeg',
  'BA211598': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA211598/Thumbnail/BA211598_az_utkk_award_Thumbnail.jpg',
  'BA212116': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA212116/Thumbnail/BA212116_STOP%E6%B5%B7%E8%B3%8A%E7%89%88ACC%E3%82%B5%E3%83%A0%E3%83%8D_%E3%82%AD%E3%83%B3%E3%82%B0%E3%83%80%E3%83%A0%E4%BF%AE%E6%AD%A3.jpg',
  'BA212368': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA212368/Thumbnail/BA212368_sotetsu_samune.jpg',
  // ===== 2021 BCB =====
  'BB212074': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212074/Thumbnail/BB212074_BB212074_%E3%82%A2%E3%83%86%E3%83%B3%E3%83%88.jpg',
  'BB211736': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211736/Thumbnail/BB211736_%E7%B5%B6%E3%83%A1%E3%82%B7.jpg',
  'BB211893': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211893/Thumbnail/BB211893_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB%E7%94%BB%E5%83%8F.jpg',
  'BB211982': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211982/Thumbnail/BB211982_%E5%A4%A7%E5%A5%BD%E7%89%A9%E9%86%A4%E6%B2%B9.jpg',
  'BB212290': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212290/Thumbnail/BB212290_BB212290_s_%E3%83%A1%E3%82%A4%E3%83%B3.jpg',
  'BB212598': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212598/Thumbnail/BB212598_%E3%82%B5%E3%83%B3%E3%83%88%E3%83%AA%E3%83%BC%E3%82%B7%E3%82%99%E3%83%A3%E3%83%8F%E3%82%9A%E3%83%8B%E3%83%BC%E3%82%B9%E3%82%99%E3%82%B7%E3%82%99%E3%83%B3%E7%BF%A0_%E3%82%B5%E3%83%A0%E3%83%8D.jpeg',
  'BB212098': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212098/Thumbnail/BB212098_BB212098.jpg',
  'BB212163': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212163/Thumbnail/BB212163_ACC_R1.jpg',
  'BB212394': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212394/Thumbnail/BB212394_BB212394_%20craftboss.jpeg',
  'BB212504': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212504/Thumbnail/BB212504_BB212504_211022_pino_almond_ACC03.jpg',
  'BB212568': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212568/Thumbnail/BB212568_%E5%B2%A9%E6%89%8B%E6%97%A5%E5%A0%B1BC%E9%83%A8%E9%96%80.jpeg',
  'BB210241': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB210241/Thumbnail/BB210241_BB210241_211021%20%E6%B5%81%E3%82%8C%E6%98%9F%E6%96%B0%E5%B9%B9%E7%B7%9A%20%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BB210517': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB210517/Thumbnail/BB210517_%E3%82%AB%E3%83%AB%E3%83%94%E3%82%B9ACC%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BB211052': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211052/Thumbnail/BB211052_%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202021-07-16%208.53.14.jpg',
  'BB211583': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211583/Thumbnail/BB211583_PBL_award_thumbnail.jpg',
  'BB211763': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB211763/Thumbnail/BB211763_BK%20TOWN%20ROOM.jpg',
  'BB212119': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212119/Thumbnail/BB212119_BB212119_%20lotte_web_%E9%9B%AA%E8%A6%8B%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88KV.jpg',
  'BB212297': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212297/Thumbnail/BB212297_HND(%E5%85%AC%E9%96%8B%E7%94%A8).jpg',
  'BB212597': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB212597/Thumbnail/BB212597_BB212597.jpg',
  // ===== 2021 BCC =====
  'BC212117': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212117/Thumbnail/BC212117_BC212117_%E3%82%A2%E3%83%86%E3%83%B3%E3%83%88.jpg',
  'BC212525': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212525/Thumbnail/BC212525_%E5%B2%A9%E6%89%8B%E6%97%A5%E5%A0%B1BC%E9%83%A8%E9%96%80.jpeg',
  'BC212607': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212607/Thumbnail/BC212607_BC212607(%E9%AB%98%E7%94%BB%E8%B3%AA).jpg',
  'BC210035': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC210035/Thumbnail/BC210035_ACC_thumbnail_Yakult.jpeg',
  'BC210230': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC210230/Thumbnail/BC210230_kyoto_logo.jpg',
  'BC210318': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC210318/Thumbnail/BC210318_ACC_seibusogo_%E3%82%B5%E3%83%A0%E3%83%8D.jpg',
  'BC211096': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC211096/Thumbnail/BC211096_BC211096_%20SPOTOMEHANDSUP.jpg',
  'BC211894': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC211894/Thumbnail/BC211894_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB%E7%94%BB%E5%83%8F.jpg',
  'BC212272': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212272/Thumbnail/BC212272_BC212272_%E3%81%BE%E3%82%82%E3%81%A3%E3%81%A6%E3%83%88%E3%83%BC%E3%83%88(%E5%85%AC%E9%96%8B%E7%94%A8).jpg',
  'BC210368': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC210368/Thumbnail/BC210368_ACC_thumbnail_POCKET%20SOAP.jpg',
  'BC210629': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC210629/Thumbnail/BC210629_BC210629_Beppu_3mitsudango.jpeg',
  'BC211421': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC211421/Thumbnail/BC211421_ACC_VIBTEX_CREATIVEINNOVATION_thumbnail%20(1).jpg',
  'BC211740': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC211740/Thumbnail/BC211740_%E7%B5%B6%E3%83%A1%E3%82%B7.jpg',
  'BC212205': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212205/Thumbnail/BC212205_BC212205_kuletegommen_logo.jpg',
  'BC212255': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212255/Thumbnail/BC212255_d69004-1-285401-0.jpg',
  'BC212418': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212418/Thumbnail/BC212418_BC212418_%E7%94%9F%E7%90%86%E7%94%A8%E5%93%81%E3%82%B5%E3%83%A0%E3%83%8D.jpg',
  'BC212515': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212515/Thumbnail/BC212515_PrideHair_tittle.jpg',
  'BC212522': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC212522/Thumbnail/BC212522_BC212522_%20ACC_toroneko.jpg',
  // ===== 2021 BCD =====
  'BD210490': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD210490/Thumbnail/BD210490_THE_FIRST_TAKE_S1.jpg',
  'BD210924': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD210924/Thumbnail/BD210924_BD210924.jpg',
  'BD212357': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212357/Thumbnail/BD212357_image_1920.jpg',
  'BD212403': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212403/Thumbnail/BD212403_BD212403_%20craftboss.jpeg',
  'BD212531': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212531/Thumbnail/BD212531_BD212531_%20saga_KV_1025.jpg',
  'BD211332': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD211332/Thumbnail/BD211332_BD211332_TwitterCP%EF%BC%884%E6%9C%88%EF%BC%89%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpeg',
  'BD211584': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD211584/Thumbnail/BD211584_PBL_award_thumbnail.jpg',
  'BD212122': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212122/Thumbnail/BD212122_BD212122_%20lotte_web_%E9%9B%AA%E8%A6%8B%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88KV.jpg',
  'BD212414': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212414/Thumbnail/BD212414_NIKE-The-Future-Isnt-Waiting-Keyframe-03.jpg',
  'BD212566': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD212566/Thumbnail/BD212566_BD212566_%20ACC_toroneko.jpg',
  // ===== 2022 BCA =====
  'BA221706': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA221706/Thumbnail/BA221706_giant3dcat.jpg',
  'BA221821': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA221821/Thumbnail/BA221821_BA221821_TOKYO2020%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BA221776': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA221776/Thumbnail/BA221776_ann_anoyoru_KV_yoko_F.jpg',
  'BA222663': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222663/Thumbnail/BA222663_BA222663_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg',
  'BA222758': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222758/Thumbnail/BA222758_0708_ACC_mate_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg',
  'BA220889': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA220889/Thumbnail/BA220889_BA220889_221014_puyo_board_ol.jpg',
  'BA222518': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222518/Thumbnail/BA222518_PlayHasNoLimits_thumb.jpg',
  'BA222577': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222577/Thumbnail/BA222577_BA222577_2_GEKIAWA%20THE%20STRONG.jpg',
  'BA222660': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222660/Thumbnail/BA222660_BA222660_pola-mother\'s-day-ACC.jpg',
  'BA222199': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222199/Thumbnail/BA222199_%E6%AF%8E%E6%97%A5%E6%96%B0%E8%81%9EAI%E3%83%A9%E3%83%83%E3%83%91%E3%83%BC_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg',
  'BA222360': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222360/Thumbnail/BA222360_BA222360_juju_acc%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BA222680': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA222680/Thumbnail/BA222680_BA222680_%E7%B7%A8%E9%9B%86%E6%B8%88%E4%BF%AF%E7%9E%B0.jpeg',
  // ===== 2022 BCB =====
  'BB222504': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222504/Thumbnail/BB222504_image.jpg',
  'BB222019': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222019/Thumbnail/BB222019_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB_%E9%9D%99%E5%B2%A1%E3%83%95%E3%82%9A%E3%83%A9%E3%83%A2.jpg',
  'BB220408': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB220408/Thumbnail/BB220408_BB220408_doraemon_2.jpg',
  'BB221614': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221614/Thumbnail/BB221614_BB221614_%E5%A4%A7%E5%98%98%E5%8D%9A%E7%89%A9%E9%A4%A8.jpg',
  'BB221741': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221741/Thumbnail/BB221741_BB221741_%E5%B7%AE%E3%81%97%E6%9B%BF%E3%81%88%E7%94%BB%E5%83%8F.jpg',
  'BB221986': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221986/Thumbnail/BB221986_BB221986_thumbnail_acc.jpg',
  'BB222690': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222690/Thumbnail/BB222690_BB222690_20220425_sanseido-05_2.jpg',
  'BB220299': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB220299/Thumbnail/BB220299_BB220299_312137664.jpg',
  'BB221607': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221607/Thumbnail/BB221607_OGP_16-9.jpg',
  'BB221920': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221920/Thumbnail/BB221920_07_chami_yt_thum_long.jpg',
  'BB222212': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222212/Thumbnail/BB222212_220704_bk_acc-ff%20sos_thumbnail_1920x1080_fix.jpg',
  'BB222864': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222864/Thumbnail/BB222864_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpeg',
  'BB220390': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB220390/Thumbnail/BB220390_211128_yo_12904.jpg',
  'BB220681': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB220681/Thumbnail/BB220681_%E5%85%AC%E9%96%8B%E7%94%A8.jpg',
  'BB220813': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB220813/Thumbnail/BB220813_BB220813_%E7%9F%B3%E3%81%AE%E3%81%BE%E3%81%A1%E7%B3%B8%E9%AD%9A%E5%B7%9D.jpg',
  'BB221745': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB221745/Thumbnail/BB221745_BB221745_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BB222037': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222037/Thumbnail/BB222037_BB222037_NISSAY_thumb.jpg',
  'BB222222': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222222/Thumbnail/BB222222_BB222222_3_MILLION%20TAG.jpg',
  'BB222516': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222516/Thumbnail/BB222516_PlayHasNoLimits_thumb.jpg',
  'BB222590': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222590/Thumbnail/BB222590_BB222590_%E5%85%A8%E5%9B%BD%E6%94%BE%E9%80%81%E3%81%A3%E3%81%BD%E3%81%8F.jpg',
  'BB222669': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB222669/Thumbnail/BB222669_BB222669_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg',
  // ===== 2022 BCC =====
  'BC222021': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC222021/Thumbnail/BC222021_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB_%E9%9D%99%E5%B2%A1%E3%83%95%E3%82%9A%E3%83%A9%E3%83%A2.jpg',
  'BC220371': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC220371/Thumbnail/BC220371_BC220371_acc_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BC222499': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC222499/Thumbnail/BC222499_image.jpg',
  'BC220691': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC220691/Thumbnail/BC220691_%E2%91%A5FRIENDLY%20DOOR.jpg',
  'BC221603': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221603/Thumbnail/BC221603_MicrosoftTeams-image.jpg',
  'BC221954': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221954/Thumbnail/BC221954_%E7%A4%BE%E9%95%B7%E3%81%AE%E3%81%8A%E3%81%93%E3%82%99%E3%82%8A%E8%87%AA%E8%B2%A9%E6%A9%9F_KV.jpg',
  'BC222685': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC222685/Thumbnail/BC222685_BC222685_20220425_sanseido-05_2.jpg',
  'BC221301': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221301/Thumbnail/BC221301_%E5%85%A5%E8%B3%9E%E7%94%BB%E5%83%8Fasahi_beery_fast.jpg',
  'BC221746': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221746/Thumbnail/BC221746_BC221746_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BC220841': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC220841/Thumbnail/BC220841_KAI_ACC_0614.jpg',
  'BC221419': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221419/Thumbnail/BC221419_acc_thm_wia.jpg',
  'BC221569': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221569/Thumbnail/BC221569_accaward_elis_thumbnail.jpg',
  'BC221901': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC221901/Thumbnail/BC221901_BC221901_%E5%B7%AE%E3%81%97%E6%9B%BF%E3%81%88%E7%94%BB%E5%83%8F.jpg',
  'BC222200': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC222200/Thumbnail/BC222200_jaxa_acc_001_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpeg',
  'BC222233': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC222233/Thumbnail/BC222233_suntory_inshokuten_thumbnail.jpg',
  // ===== 2023 BCA =====
  'BA232366': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA232366/Thumbnail/BA232366_suntory_kv.jpg',
  'BA231871': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA231871/Thumbnail/BA231871_%e3%82%a2%e3%83%bc%e3%82%b9%e8%a3%bd%e8%96%ac%e3%81%8b%e3%82%89%e3%81%ae%e8%84%b1%e8%b5%b0_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BA230840': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA230840/Thumbnail/BA230840_%e3%82%b5%e3%83%a0%e3%83%8d720.jpg',
  'BA230038': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA230038/Thumbnail/BA230038_thumbnail.jpg',
  'BA231074': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA231074/Thumbnail/BA231074_reference1.jpg',
  'BA232170': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA232170/Thumbnail/BA232170_HondaRewired_%e5%91%8a%e7%9f%a5Visual.jpg',
  'BA230425': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA230425/Thumbnail/BA230425_JR%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg',
  'BA230524': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA230524/Thumbnail/BA230524_top_01.jpeg',
  'BA232045': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA232045/Thumbnail/BA232045_%e5%8b%95%e7%94%bb%e2%91%a5.jpg',
  'BA232683': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA232683/Thumbnail/BA232683_MOS+BURGER_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpeg',
  'BA232711': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BA232711/Thumbnail/BA232711_%e3%82%b5%e3%83%b3%e3%83%88%e3%83%aa%e3%83%bc%e5%a4%a9%e7%84%b6%e6%b0%b4%e3%82%b9%e3%83%8f%e3%82%9a%e3%83%bc%e3%82%af%e3%83%aa%e3%83%b3%e3%82%b0%e3%83%ac%e3%83%a2%e3%83%b3.jpg',
  // ===== 2023 BCB =====
  'BB231137': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231137/Thumbnail/BB231137_TAROMAN.jpg',
  'BB231009': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231009/Thumbnail/BB231009_16_9_.jpg',
  'BB232780': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232780/Thumbnail/BB232780_toeianime_slamdunk.jpg',
  'BB231073': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231073/Thumbnail/BB231073_thumbnail_accawards_chocoball_karaoke.jpg',
  'BB231210': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231210/Thumbnail/BB231210_kakure.jpg',
  'BB232480': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232480/Thumbnail/BB232480_McBlue_acc.jpeg',
  'BB232690': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232690/Thumbnail/BB232690_TYC_KV_ACCniteJPEGnihenkan.jpg',
  'BB232753': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232753/Thumbnail/BB232753_%e3%83%95%e3%82%99%e3%83%ac%e3%83%83%e3%82%af%e3%83%95%e3%82%a1%e3%83%bc%e3%82%b9%e3%83%88%e3%83%9b%e3%83%86%e3%83%ab%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BB230369': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB230369/Thumbnail/BB230369_accawards_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg',
  'BB231793': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231793/Thumbnail/BB231793_02_matching_tanka_KV_5.jpg',
  'BB231930': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231930/Thumbnail/BB231930_ACC%e8%b3%9e_BC%e9%83%a8%e9%96%80_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpeg',
  'BB232146': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232146/Thumbnail/BB232146_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BB232327': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232327/Thumbnail/BB232327_1_KV_OGP.jpg',
  'BB232414': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232414/Thumbnail/BB232414_ecc_acc_thumb_01.jpg',
  'BB232487': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232487/Thumbnail/BB232487_220916_pinogame_OGP.jpg',
  'BB232500': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232500/Thumbnail/BB232500_SaudiANIMEacc_MASTER0705.jpg',
  'BB230504': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB230504/Thumbnail/BB230504_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab1.jpg',
  'BB231187': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231187/Thumbnail/BB231187_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg',
  'BB231224': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231224/Thumbnail/BB231224_%e3%83%9b%e3%82%b0%e3%82%b7%e3%83%bc%e3%83%a9%e3%83%b3%e3%83%89_%e3%82%ad%e3%83%bc%e3%83%b4%e3%82%a3%e3%82%b8%e3%83%a5%e3%82%a2%e3%83%ab.jpg',
  'BB231417': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231417/Thumbnail/BB231417_230706_ACC_bigbet_thumbnail.jpg',
  'BB231497': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231497/Thumbnail/BB231497_accawards_667+love+letters_+thumbnail+board.jpg',
  'BB231568': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231568/Thumbnail/BB231568_%e7%94%bb%e3%81%ae%e3%81%aa%e3%81%84%e3%82%af%e3%82%99%e3%83%ab%e3%83%a1%e3%82%ab%e3%82%99%e3%82%a4%e3%83%88%e3%82%99.jpeg',
  'BB231991': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB231991/Thumbnail/BB231991_%e9%86%a4%ef%bc%93_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg',
  'BB232020': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232020/Thumbnail/BB232020_match_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BB232144': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232144/Thumbnail/BB232144_%e5%ba%83%e5%91%8a_%e5%85%a8%e5%8f%b7%e3%82%bb%e3%83%83%e3%83%88.jpg',
  'BB232367': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BB232367/Thumbnail/BB232367_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%88%e3%82%991.jpeg',
  // ===== 2023 BCC =====
  'BC230834': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC230834/Thumbnail/BC230834_%e3%82%b5%e3%83%a0%e3%83%8d720.jpg',
  'BC232706': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232706/Thumbnail/BC232706_TYC_KV_ACCniteJPEGnihenkan.jpg',
  'BC230718': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC230718/Thumbnail/BC230718_docomo_music_B_230221_2.jpg',
  'BC231334': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC231334/Thumbnail/BC231334_08.jpg',
  'BC232068': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232068/Thumbnail/BC232068_230629_G%e7%9b%ae%e7%b7%9a_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BC232620': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232620/Thumbnail/BC232620_%e3%83%86%e3%82%a3%e3%83%ad%e3%83%aa%e3%83%9f%e3%83%83%e3%82%af%e3%82%b9BC232620.jpg',
  'BC231042': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC231042/Thumbnail/BC231042_Sizzlebungaku+Mac_for+ACCsite.jpg',
  'BC231887': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC231887/Thumbnail/BC231887_The_Fable_ACC_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BC232544': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232544/Thumbnail/BC232544_%e3%81%a9%e3%82%93%e5%85%b5%e8%a1%9b_ACC_230710.jpg',
  'BC232661': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232661/Thumbnail/BC232661_%e3%80%90%e2%91%a0-1%e3%80%91%e8%a7%a3%e7%a6%81KV_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpeg',
  'BC231115': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC231115/Thumbnail/BC231115_OUR+MOMENTS_%e4%ba%8b%e5%8b%99%e5%b1%80%e5%a4%89%e6%8f%9b.jpg',
  'BC232001': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232001/Thumbnail/BC232001_%e2%98%85220712_mate_long_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'BC232178': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232178/Thumbnail/BC232178_%e5%a4%a7%e4%bc%9a%e3%83%ad%e3%82%b4_001_0706_2040_back.jpg',
  'BC232192': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232192/Thumbnail/BC232192_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab1920%c3%971080.jpg',
  'BC232704': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BC232704/Thumbnail/BC232704_UFO_KV_230403_fin.jpg',
  // ===== 2023 PR =====
  'PR231185': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231185/Thumbnail/PR231185_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg',
  'PR231065': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231065/Thumbnail/PR231065_sumnail.jpg',
  'PR232708': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232708/Thumbnail/PR232708_muenji_thumbnail.jpg',
  'PR230552': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR230552/Thumbnail/PR230552_230613_hotamet_ACC_KV.jpg',
  'PR231028': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231028/Thumbnail/PR231028_4_kodomonoshiten_pr.jpg',
  'PR232461': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232461/Thumbnail/PR232461_I+know+IBD.jpg',
  'PR230133': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR230133/Thumbnail/PR230133_%e3%81%93%e3%81%a9%e3%82%82%e9%81%b8%e6%8c%99_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpg',
  'PR230775': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR230775/Thumbnail/PR230775_ACC_HASHI_KV_1920_1080.jpeg',
  'PR231554': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231554/Thumbnail/PR231554_%e3%82%aa%e3%83%8e%e3%83%87%e3%83%a9_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'PR232473': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232473/Thumbnail/PR232473_McBlue_acc.jpeg',
  'PR230023': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR230023/Thumbnail/PR230023_thumbnail.jpg',
  'PR230591': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR230591/Thumbnail/PR230591_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg',
  'PR231606': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231606/Thumbnail/PR231606_%e7%94%bb%e3%81%ae%e3%81%aa%e3%81%84%e3%82%af%e3%82%99%e3%83%ab%e3%83%a1%e3%82%ab%e3%82%99%e3%82%a4%e3%83%88%e3%82%99.jpeg',
  'PR231842': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231842/Thumbnail/PR231842_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'PR231850': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR231850/Thumbnail/PR231850_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%891.JPG',
  'PR232332': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232332/Thumbnail/PR232332_acc_voiceproject_series.jpg',
  'PR232365': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232365/Thumbnail/PR232365_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%88%e3%82%991.jpeg',
  'PR232445': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232445/Thumbnail/PR232445_%23%e6%9c%a8%e6%9b%9c%e6%97%a5%e3%81%af%e6%9c%ac%e6%9b%9c%e6%97%a5_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg',
  'PR232449': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232449/Thumbnail/PR232449_%e3%82%b7%e3%83%b3%e3%82%af%e3%83%ad%e3%82%bf%e3%82%a4%e3%83%ab.jpg',
  'PR232743': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/PR232743/Thumbnail/PR232743__230705_ACC_%e3%82%a4%e3%83%a1%e3%83%bc%e3%82%b7%e3%82%99%e7%94%bb%e5%83%8f.jpg',
  // ===== 2022 BCD =====
  'BD222579': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222579/Thumbnail/BD222579_BD222579_2_GEKIAWA%20THE%20STRONG.jpg',
  'BD221707': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD221707/Thumbnail/BD221707_giant3dcat.jpg',
  'BD221744': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD221744/Thumbnail/BD221744_BD221744_VOICEPROJECT2021.jpg',
  'BD222374': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222374/Thumbnail/BD222374_220222_Honda_F1_NP15d_JP.jpg',
  'BD222406': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222406/Thumbnail/BD222406_0708_ACC_mate_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg',
  'BD220060': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD220060/Thumbnail/BD220060_BD220060_221014_puyo_board_ol.jpg',
  'BD220372': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD220372/Thumbnail/BD220372_BD220372_acc_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg',
  'BD222583': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222583/Thumbnail/BD222583_BD222583_5_6%E7%A7%92%E5%95%86%E5%BA%97.jpg',
  'BD222672': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222672/Thumbnail/BD222672_BD222672_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg',
  'BD222256': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222256/Thumbnail/BD222256_BD222256_%E3%81%BB%E3%82%8D%E3%82%88%E3%81%84%E9%A3%B2%E3%82%93%E3%81%A7%E3%81%AA%E3%81%AB%E3%81%97%E3%82%88%E3%81%86_60%E7%A7%92A%E7%AF%87.jpg',
  'BD222386': 'https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/BD222386/Thumbnail/BD222386_BD222386_%E3%82%AB%E3%83%95%E3%82%A7%E3%83%98%E3%82%99%E3%83%BC%E3%82%B9.jpg',
};

function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const rows  = sheet.getDataRange().getValues();

    if (rows.length < 2) return jsonOutput({ cards: [] });

    const MEDAL_LABELS = {
      'grand-prix': 'グランプリ',
      'gold'      : 'ゴールド',
      'silver'    : 'シルバー',
      'bronze'    : 'ブロンズ',
      'finalist'  : 'ファイナリスト',
    };

    // 1行目をヘッダーとして読み込む（列を追加しても自動対応）
    const headers = rows[0].map(h => String(h).trim());

    const cards = rows
      .slice(1)
      .filter(row => String(row[0]).trim())
      .map((row, index) => {
        const card = { id: index };

        // ヘッダー名をキーとして全列を読み込む
        headers.forEach((key, i) => {
          if (key) card[key] = String(row[i] || '');
        });

        card.year       = Number(card.year) || 0;
        card.medalLabel = MEDAL_LABELS[card.medal] || card.medal;

        // "Url" で終わる全フィールドに Google Drive URL 変換を適用
        Object.keys(card).forEach(key => {
          if (key.endsWith('Url') && card[key]) {
            card[key] = convertDriveUrl(card[key]);
          }
        });

        // 作品番号を取得（workNumberフィールド → thumbnailUrlから抽出）
        let wn = (card.workNumber || '').trim();
        if (!wn && card.thumbnailUrl) {
          const m = card.thumbnailUrl.match(/([A-Z]{2}\d{6})/);
          if (m) wn = m[1];
        }

        if (card.year === 2021 && wn) {
          // 2021年: S3は破損のため review ページのURLを直接構築
          card.thumbnailUrl = 'https://www.acc-awards.com/festival/2021fes_result/review/img/' + wn + '.jpg';
        } else {
          // 2022年以降: S3辞書でURLを上書き
          const s3url = wn ? S3_THUMB[wn] : null;
          if (s3url) {
            card.thumbnailUrl = s3url;
          }
        }

        // 2023年: URLパス修正 (/images/bc/ → /bc_review/images/)
        if (card.thumbnailUrl && card.thumbnailUrl.indexOf('2023fes_result') !== -1) {
          card.thumbnailUrl = card.thumbnailUrl.replace('/images/bc/', '/bc_review/images/');
        }

        return card;
      });

    return jsonOutput({ cards });

  } catch (err) {
    return jsonOutput({ error: err.message, cards: [] });
  }
}

// Google Drive の共有URLを lh3 形式に変換
function convertDriveUrl(url) {
  if (!url) return '';
  const match = url.match(/\/file\/d\/([^\/]+)/);
  if (match) return 'https://lh3.googleusercontent.com/d/' + match[1];
  return url;
}

function jsonOutput(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
