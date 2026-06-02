function fillThumbnails_2018_2023() {
  var ss = SpreadsheetApp.openById("1BYcN3PqYeya_lnbpM8j6aXcBt9GS47hlnzgFl7hwY_k");
  var sheet = ss.getSheets()[0];

  var S3 = "https://s3-ap-northeast-1.amazonaws.com/acc-s3/UploadFiles/PROD/";

  // workNo -> thumbnail filename (for S3) or full URL (for old-style)
  // S3 URL = S3 + workNo + "/Thumbnail/" + filename
  // Old-style (2018-2020): https://www.acc-awards.com/festival/20YYfes_result/images/bc/workNo.jpg
  var s3map = {
    // ── 2023 BCB ──
    "BB231137": "BB231137_TAROMAN.jpg",
    "BB231009": "BB231009_16_9_.jpg",
    "BB232780": "BB232780_toeianime_slamdunk.jpg",
    "BB231073": "BB231073_thumbnail_accawards_chocoball_karaoke.jpg",
    "BB231210": "BB231210_kakure.jpg",
    "BB232480": "BB232480_McBlue_acc.jpeg",
    "BB232690": "BB232690_TYC_KV_ACCniteJPEGnihenkan.jpg",
    "BB231793": "BB231793_02_matching_tanka_KV_5.jpg",
    "BB232327": "BB232327_1_KV_OGP.jpg",
    "BB232414": "BB232414_ecc_acc_thumb_01.jpg",
    "BB232487": "BB232487_220916_pinogame_OGP.jpg",
    "BB232500": "BB232500_SaudiANIMEacc_MASTER0705.jpg",
    "BB231417": "BB231417_230706_ACC_bigbet_thumbnail.jpg",
    "BB231497": "BB231497_accawards_667+love+letters_+thumbnail+board.jpg",
    // ── 2023 BCC ──
    "BC232706": "BC232706_TYC_KV_ACCniteJPEGnihenkan.jpg",
    "BC230718": "BC230718_docomo_music_B_230221_2.jpg",
    "BC231334": "BC231334_08.jpg",
    "BC231042": "BC231042_Sizzlebungaku+Mac_for+ACCsite.jpg",
    "BC232704": "BC232704_UFO_KV_230403_fin.jpg",
    // ── 2023 PR ──
    "PR231065": "PR231065_sumnail.jpg",
    "PR232708": "PR232708_muenji_thumbnail.jpg",
    "PR230552": "PR230552_230613_hotamet_ACC_KV.jpg",
    "PR231028": "PR231028_4_kodomonoshiten_pr.jpg",
    "PR232461": "PR232461_I+know+IBD.jpg",
    "PR230775": "PR230775_ACC_HASHI_KV_1920_1080.jpeg",
    "PR232473": "PR232473_McBlue_acc.jpeg",
    "PR230023": "PR230023_thumbnail.jpg",
    "PR232332": "PR232332_acc_voiceproject_series.jpg",
    // ── 2023 BCA ──
    "BA232366": "BA232366_suntory_kv.jpg",
    "BA230038": "BA230038_thumbnail.jpg",
    "BA231074": "BA231074_reference1.jpg",
    "BA230524": "BA230524_top_01.jpeg",
    // ── 2022 BCA ──
    "BA221706": "BA221706_giant3dcat.jpg",
    "BA221776": "BA221776_ann_anoyoru_KV_yoko_F.jpg",
    "BA220889": "BA220889_BA220889_221014_puyo_board_ol.jpg",
    "BA222518": "BA222518_PlayHasNoLimits_thumb.jpg",
    "BA222660": "BA222660_BA222660_pola-mother's-day-ACC.jpg",
    // ── 2022 BCB ──
    "BB222504": "BB222504_image.jpg",
    "BB220408": "BB220408_BB220408_doraemon_2.jpg",
    "BB221986": "BB221986_BB221986_thumbnail_acc.jpg",
    "BB222690": "BB222690_BB222690_20220425_sanseido-05_2.jpg",
    "BB220299": "BB220299_BB220299_312137664.jpg",
    "BB221607": "BB221607_OGP_16-9.jpg",
    "BB221920": "BB221920_07_chami_yt_thum_long.jpg",
    "BB220390": "BB220390_211128_yo_12904.jpg",
    "BB222037": "BB222037_BB222037_NISSAY_thumb.jpg",
    "BB222516": "BB222516_PlayHasNoLimits_thumb.jpg",
    // ── 2022 BCC ──
    "BC222499": "BC222499_image.jpg",
    "BC221603": "BC221603_MicrosoftTeams-image.jpg",
    "BC222685": "BC222685_BC222685_20220425_sanseido-05_2.jpg",
    "BC220841": "BC220841_KAI_ACC_0614.jpg",
    "BC221419": "BC221419_acc_thm_wia.jpg",
    "BC221569": "BC221569_accaward_elis_thumbnail.jpg",
    "BC222233": "BC222233_suntory_inshokuten_thumbnail.jpg",
    // ── 2022 BCD ──
    "BD221707": "BD221707_giant3dcat.jpg",
    "BD221744": "BD221744_BD221744_VOICEPROJECT2021.jpg",
    "BD222374": "BD222374_220222_Honda_F1_NP15d_JP.jpg",
    "BD220060": "BD220060_BD220060_221014_puyo_board_ol.jpg",
    // ── 2021 BCA ──
    "BA211082": "BA211082_accawards_pola.jpg",
    "BA210485": "BA210485_THE_FIRST_TAKE_S1.jpg",
    "BA211582": "BA211582_PBL_award_thumbnail.jpg",
    "BA210928": "BA210928_pc_kibo_sunrise_key_visual_1920_1080.jpg",
    "BA211086": "BA211086_n10-thumnail-001.jpg",
    "BA211679": "BA211679_BA211679_YAKUSHIMA.jpeg",
    "BA211598": "BA211598_az_utkk_award_Thumbnail.jpg",
    "BA212368": "BA212368_sotetsu_samune.jpg",
    // ── 2021 BCB ──
    "BB212098": "BB212098_BB212098.jpg",
    "BB212163": "BB212163_ACC_R1.jpg",
    "BB212504": "BB212504_BB212504_211022_pino_almond_ACC03.jpg",
    "BB211583": "BB211583_PBL_award_thumbnail.jpg",
    "BB212597": "BB212597_BB212597.jpg",
    // ── 2021 BCC ──
    "BC210035": "BC210035_ACC_thumbnail_Yakult.jpeg",
    "BC210230": "BC210230_kyoto_logo.jpg",
    "BC210629": "BC210629_BC210629_Beppu_3mitsudango.jpeg",
    "BC212205": "BC212205_BC212205_kuletegommen_logo.jpg",
    "BC212255": "BC212255_d69004-1-285401-0.jpg",
    "BC212515": "BC212515_PrideHair_tittle.jpg",
    // ── 2021 BCD ──
    "BD210490": "BD210490_THE_FIRST_TAKE_S1.jpg",
    "BD210924": "BD210924_BD210924.jpg",
    "BD212357": "BD212357_image_1920.jpg",
    "BD211584": "BD211584_PBL_award_thumbnail.jpg",
    "BD212414": "BD212414_NIKE-The-Future-Isnt-Waiting-Keyframe-03.jpg",
    // ── encoded entries ──
    "BB232753": "BB232753_%e3%83%95%e3%82%99%e3%83%ac%e3%83%83%e3%82%af%e3%83%95%e3%82%a1%e3%83%bc%e3%82%b9%e3%83%88%e3%83%9b%e3%83%86%e3%83%ab%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BB230369": "BB230369_accawards_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg",
    "BB231930": "BB231930_ACC%e8%b3%9e_BC%e9%83%a8%e9%96%80_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpeg",
    "BB232146": "BB232146_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BB230504": "BB230504_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab1.jpg",
    "BB231187": "BB231187_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg",
    "BB231224": "BB231224_%e3%83%9b%e3%82%b0%e3%82%b7%e3%83%bc%e3%83%a9%e3%83%b3%e3%83%89_%e3%82%ad%e3%83%bc%e3%83%b4%e3%82%a3%e3%82%b8%e3%83%a5%e3%82%a2%e3%83%ab.jpg",
    "BB231568": "BB231568_%e7%94%bb%e3%81%ae%e3%81%aa%e3%81%84%e3%82%af%e3%82%99%e3%83%ab%e3%83%a1%e3%82%ab%e3%82%99%e3%82%a4%e3%83%88%e3%82%99.jpeg",
    "BB231991": "BB231991_%e9%86%a4%ef%bc%93_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg",
    "BB232020": "BB232020_match_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BB232144": "BB232144_%e5%ba%83%e5%91%8a_%e5%85%a5%e5%8f%b7%e3%82%bb%e3%83%83%e3%83%88.jpg",
    "BB232367": "BB232367_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%88%e3%82%991.jpeg",
    "BC230834": "BC230834_%e3%82%b5%e3%83%a0%e3%83%8d720.jpg",
    "BC232068": "BC232068_230629_G%e7%9b%ae%e7%b7%9a_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BC232620": "BC232620_%e3%83%86%e3%82%a3%e3%83%ad%e3%83%aa%e3%83%9f%e3%83%83%e3%82%af%e3%82%b9BC232620.jpg",
    "BC231887": "BC231887_The_Fable_ACC_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BC232544": "BC232544_%e3%81%a9%e3%82%93%e5%85%b5%e8%a1%9b_ACC_230710.jpg",
    "BC232661": "BC232661_%e3%80%90%e2%91%a0-1%e3%80%91%e8%a7%a3%e7%a6%81KV_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpeg",
    "BC231115": "BC231115_OUR+MOMENTS_%e4%ba%8b%e5%8b%99%e5%b1%80%e5%a4%89%e6%8f%9b.jpg",
    "BC232001": "BC232001_%e2%98%85220712_mate_long_%e5%85%ac%e9%96%8b%e7%94%a8%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BC232178": "BC232178_%e5%a4%a7%e4%bc%9a%e3%83%ad%e3%82%b4_001_0706_2040_back.jpg",
    "BC232192": "BC232192_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab1920%c3%971080.jpg",
    "PR231185": "PR231185_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg",
    "PR230133": "PR230133_%e3%81%93%e3%81%a9%e3%82%82%e9%81%b8%e6%8c%99_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpg",
    "PR231554": "PR231554_%e3%82%aa%e3%83%8e%e3%83%87%e3%83%a9_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "PR230591": "PR230591_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpeg",
    "PR231606": "PR231606_%e7%94%bb%e3%81%ae%e3%81%aa%e3%81%84%e3%82%af%e3%82%99%e3%83%ab%e3%83%a1%e3%82%ab%e3%82%99%e3%82%a4%e3%83%88%e3%82%99.jpeg",
    "PR231842": "PR231842_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "PR231850": "PR231850_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%891.JPG",
    "PR232365": "PR232365_%e3%82%b9%e3%83%a9%e3%82%a4%e3%83%88%e3%82%991.jpeg",
    "PR232445": "PR232445_%23%e6%9c%a8%e6%9b%9c%e6%97%a5%e3%81%af%e6%9c%ac%e6%9b%9c%e6%97%a5_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "PR232449": "PR232449_%e3%82%b7%e3%83%b3%e3%82%af%e3%83%ad%e3%82%bf%e3%82%a4%e3%83%88%e3%83%ab.jpg",
    "PR232743": "PR232743__230705_ACC_%e3%82%a4%e3%83%a1%e3%83%bc%e3%82%b7%e3%82%99%e7%94%bb%e5%83%8f.jpg",
    "BA231871": "BA231871_%e3%82%a2%e3%83%bc%e3%82%b9%e8%a3%bd%e8%96%ac%e3%81%8b%e3%82%89%e3%81%ae%e8%84%b1%e8%b5%b0_%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab.jpg",
    "BA230840": "BA230840_%e3%82%b5%e3%83%a0%e3%83%8d720.jpg",
    "BA232170": "BA232170_HondaRewired_%e5%91%8a%e7%9f%a5Visual.jpg",
    "BA230425": "BA230425_JR%e3%82%b5%e3%83%a0%e3%83%8d%e3%82%a4%e3%83%ab%e7%94%bb%e5%83%8f.jpg",
    "BA232045": "BA232045_%e5%8b%95%e7%94%bb%e2%91%a5.jpg",
    "BA232683": "BA232683_MOS+BURGER_%e4%ba%8b%e5%8b%99%e5%b1%80%e4%bf%ae%e6%ad%a3.jpeg",
    "BA232711": "BA232711_%e3%82%b5%e3%83%b3%e3%83%88%e3%83%aa%e3%83%bc%e5%a4%a9%e7%84%b6%e6%b0%b4%e3%82%b9%e3%83%8f%e3%82%9a%e3%83%bc%e3%82%af%e3%83%aa%e3%83%b3%e3%82%af%e3%82%99%e3%83%ac%e3%83%a2%e3%83%b3.jpg",
    "BA221821": "BA221821_BA221821_TOKYO2020%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BA222663": "BA222663_BA222663_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg",
    "BA222758": "BA222758_0708_ACC_mate_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg",
    "BA222577": "BA222577_BA222577_2_GEKIAWA%20THE%20STRONG.jpg",
    "BA222199": "BA222199_%E6%AF%8E%E6%97%A5%E6%96%B0%E8%81%9EAI%E3%83%A9%E3%83%83%E3%83%91%E3%83%BC_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg",
    "BA222360": "BA222360_BA222360_juju_acc%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BA222680": "BA222680_BA222680_%E7%B7%A8%E9%9B%86%E6%B8%88%E4%BF%AF%E7%9E%B0.jpeg",
    "BB222019": "BB222019_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB_%E9%9D%99%E5%B2%A1%E3%83%95%E3%82%9A%E3%83%A9%E3%83%A2.jpg",
    "BB221614": "BB221614_BB221614_%E5%A4%A7%E5%98%98%E5%8D%9A%E7%89%A9%E9%A4%A8.jpg",
    "BB221741": "BB221741_BB221741_%E5%B7%AE%E3%81%97%E6%9B%BF%E3%81%88%E7%94%BB%E5%83%8F.jpg",
    "BB222212": "BB222212_220704_bk_acc-ff%20sos_thumbnail_1920x1080_fix.jpg",
    "BB222864": "BB222864_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpeg",
    "BB220681": "BB220681_%E5%85%AC%E9%96%8B%E7%94%A8.jpg",
    "BB220813": "BB220813_BB220813_%E7%9F%B3%E3%81%AE%E3%81%BE%E3%81%A1%E7%B3%B8%E9%AD%9A%E5%B7%9D.jpg",
    "BB221745": "BB221745_BB221745_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BB222222": "BB222222_BB222222_3_MILLION%20TAG.jpg",
    "BB222590": "BB222590_BB222590_%E5%85%A8%E5%9B%BD%E6%94%BE%E9%80%81%E3%81%A3%E3%81%BD%E3%81%8F.jpg",
    "BB222669": "BB222669_BB222669_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg",
    "BC222021": "BC222021_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB_%E9%9D%99%E5%B2%A1%E3%83%95%E3%82%9A%E3%83%A9%E3%83%A2.jpg",
    "BC220371": "BC220371_BC220371_acc_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BC220691": "BC220691_%E2%91%A5FRIENDLY%20DOOR.jpg",
    "BC221954": "BC221954_%E7%A4%BE%E9%95%B7%E3%81%AE%E3%81%8A%E3%81%93%E3%82%99%E3%82%8A%E8%87%AA%E8%B2%A9%E6%A9%9F_KV.jpg",
    "BC221301": "BC221301_%E5%85%A5%E8%B3%9E%E7%94%BB%E5%83%8Fasahi_beery_fast.jpg",
    "BC221746": "BC221746_BC221746_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BC221901": "BC221901_BC221901_%E5%B7%AE%E3%81%97%E6%9B%BF%E3%81%88%E7%94%BB%E5%83%8F.jpg",
    "BC222200": "BC222200_jaxa_acc_001_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpeg",
    "BD222579": "BD222579_BD222579_2_GEKIAWA%20THE%20STRONG.jpg",
    "BD222406": "BD222406_0708_ACC_mate_%E5%85%AC%E9%96%8B%E7%94%A8%E7%94%BB%E5%83%8F.jpg",
    "BD220372": "BD220372_BD220372_acc_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BD222583": "BD222583_BD222583_5_6%E7%A7%92%E5%95%86%E5%BA%97.jpg",
    "BD222672": "BD222672_BD222672_1_%E3%83%96%E3%83%AB%E3%83%BC%E3%83%8F%E3%83%A0%E3%83%8F%E3%83%A0_%E5%85%A5%E8%B3%9E%E4%BD%9C%E5%93%81%E7%99%BA%E8%A1%A8%E3%83%9A%E3%83%BC%E3%82%B8%E7%94%A8.jpg",
    "BD222256": "BD222256_BD222256_%E3%81%BB%E3%82%8D%E3%82%88%E3%81%84%E9%A3%B2%E3%82%93%E3%81%A7%E3%81%AA%E3%81%AB%E3%81%97%E3%82%88%E3%81%86_60%E7%A7%92A%E7%AF%87.jpg",
    "BD222386": "BD222386_BD222386_%E3%82%AB%E3%83%95%E3%82%A7%E3%83%98%E3%82%99%E3%83%BC%E3%82%B9.jpg",
    "BA212116": "BA212116_STOP%E6%B5%B7%E8%B3%8A%E7%89%88ACC%E3%82%B5%E3%83%A0%E3%83%8D_%E3%82%AD%E3%83%B3%E3%82%B0%E3%83%80%E3%83%A0%E4%BF%AE%E6%AD%A3.jpg",
    "BB212074": "BB212074_BB212074_%E3%82%A2%E3%83%86%E3%83%B3%E3%83%88.jpg",
    "BB211736": "BB211736_%E7%B5%B6%E3%83%A1%E3%82%B7.jpg",
    "BB211893": "BB211893_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB%E7%94%BB%E5%83%8F.jpg",
    "BB211982": "BB211982_%E5%A4%A7%E5%A5%BD%E7%89%A9%E9%86%A4%E6%B2%B9.jpg",
    "BB212290": "BB212290_BB212290_s_%E3%83%A1%E3%82%A4%E3%83%B3.jpg",
    "BB212598": "BB212598_%E3%82%B5%E3%83%B3%E3%83%88%E3%83%AA%E3%83%BC%E3%82%B7%E3%82%99%E3%83%A3%E3%83%8F%E3%82%9A%E3%83%8B%E3%83%BC%E3%82%BA%E3%82%99%E3%82%B7%E3%82%99%E3%83%B3%E7%BF%A0_%E3%82%B5%E3%83%A0%E3%83%8D.jpeg",
    "BB212394": "BB212394_BB212394_%20craftboss.jpeg",
    "BB212568": "BB212568_%E5%B2%A9%E6%89%8B%E6%97%A5%E5%A0%B1BC%E9%83%A8%E9%96%80.jpeg",
    "BB210241": "BB210241_BB210241_211021%20%E6%B5%81%E3%82%8C%E6%98%9F%E6%96%B0%E5%B9%B9%E7%B7%9A%20%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BB210517": "BB210517_%E3%82%AB%E3%83%AB%E3%83%94%E3%82%B9ACC%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB.jpg",
    "BB211052": "BB211052_%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202021-07-16%208.53.14.jpg",
    "BB211763": "BB211763_BK%20TOWN%20ROOM.jpg",
    "BB212119": "BB212119_BB212119_%20lotte_web_%E9%9B%AA%E8%A6%8B%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88KV.jpg",
    "BB212297": "BB212297_HND(%E5%85%AC%E9%96%8B%E7%94%A8).jpg",
    "BC212117": "BC212117_BC212117_%E3%82%A2%E3%83%86%E3%83%B3%E3%83%88.jpg",
    "BC212525": "BC212525_%E5%B2%A9%E6%89%8B%E6%97%A5%E5%A0%B1BC%E9%83%A8%E9%96%80.jpeg",
    "BC212607": "BC212607_BC212607(%E9%AB%98%E7%94%BB%E8%B3%AA).jpg",
    "BC210318": "BC210318_ACC_seibusogo_%E3%82%B5%E3%83%A0%E3%83%8D.jpg",
    "BC211096": "BC211096_BC211096_%20SPOTOMEHANDSUP.jpg",
    "BC211894": "BC211894_%E3%82%B5%E3%83%A0%E3%83%8D%E3%82%A4%E3%83%AB%E7%94%BB%E5%83%8F.jpg",
    "BC212272": "BC212272_BC212272_%E3%81%BE%E3%82%82%E3%81%A3%E3%81%A6%E3%83%88%E3%83%BC%E3%83%88(%E5%85%AC%E9%96%8B%E7%94%A8).jpg",
    "BC210368": "BC210368_ACC_thumbnail_POCKET%20SOAP.jpg",
    "BC211421": "BC211421_ACC_VIBTEX_CREATIVEINNOVATION_thumbnail%20(1).jpg",
    "BC211740": "BC211740_%E7%B5%B6%E3%83%A1%E3%82%B7.jpg",
    "BC212418": "BC212418_BC212418_%E7%94%9F%E7%90%86%E7%94%A8%E5%93%81%E3%82%B5%E3%83%A0%E3%83%8D.jpg",
    "BC212522": "BC212522_BC212522_%20ACC_toroneko.jpg",
    "BD212403": "BD212403_BD212403_%20craftboss.jpeg",
    "BD212531": "BD212531_BD212531_%20saga_KV_1025.jpg",
    "BD211332": "BD211332_BD211332_TwitterCP%EF%BC%884%E6%9C%88%EF%BC%89%E3%81%AE%E3%82%B3%E3%83%92%E3%82%9A%E3%83%BC.jpeg",
    "BD212122": "BD212122_BD212122_%20lotte_web_%E9%9B%AA%E8%A6%8B%E3%83%88%E3%83%BC%E3%82%B9%E3%83%88KV.jpg",
    "BD212566": "BD212566_BD212566_%20ACC_toroneko.jpg"
  };

  // Read workNos from col A, rows 126-521
  var startRow = 126, lastRow = 521;
  var colA = sheet.getRange(startRow, 1, lastRow - startRow + 1, 1).getValues();
  var updated = 0;

  colA.forEach(function(row, i) {
    var workNo = String(row[0]).trim();
    if (!workNo) return;

    var url = '';
    if (s3map[workNo]) {
      url = S3 + workNo + '/Thumbnail/' + s3map[workNo];
    } else {
      // Old-style (2018-2020): reconstruct from workNo
      var yy = workNo.slice(2, 4); // e.g. "18","19","20"
      var yr = parseInt(yy) <= 24 ? '20' + yy : '19' + yy;
      // Only apply for years 2018-2020
      if (yr >= '2018' && yr <= '2020') {
        url = 'https://www.acc-awards.com/festival/' + yr + 'fes_result/images/bc/' + workNo + '.jpg';
      }
    }

    if (url) {
      sheet.getRange(startRow + i, 8).setValue(url);
      updated++;
    }
  });

  SpreadsheetApp.flush();
  return 'Done: updated ' + updated + ' thumbnails';
}
