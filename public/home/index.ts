import $ from "jquery";
import { ROOT } from "setting/constants";
import { ERR_CODE } from "setting/enums";
import IMG_MUTE from "./volume-mute-solid.svg";
import IMG_UP from "./volume-up-solid.svg";
// import VID_HOME from "./home_video.mp4";
import "./style.less";

const isMobile = checkIfMoblie();

$(() => {
  if (isMobile) {
    initMobile();
  } else {
    initPC();
  }
});

function initMobile() {
  $(".mobile .btn").on("click", login);
  $(".mobile").show();
}

function initPC() {
  const $form = $(".pc .sign-up");
  const $volume = $("#volume");
  const $video = $(".pc .video-bg video");
  $("#join").on("click", () => toggleLogin($form));
  $(".pc .sign-up button").on("click", login);
  $video.prop(
    "src",
    "https://wyh-open.s3-ap-southeast-2.amazonaws.com/home_video.mp4"
  );
  $volume.prop("src", IMG_MUTE);
  $volume.on("click", () => toggleMute($volume, $video));
  $(".pc").show();
}

function checkIfMoblie(): boolean {
  return window.navigator.userAgent.includes("Mobile");
}

function toggleMute($volume: JQuery<HTMLElement>, $video: JQuery<HTMLElement>) {
  const muted = $video.prop("muted");
  $video.prop("muted", !muted);
  $volume.attr("src", $video.prop("muted") ? IMG_MUTE : IMG_UP);
}

function toggleLogin($form: JQuery<HTMLElement>) {
  if ($form.is(":visible")) {
    $form.hide();
  } else {
    $form.show();
  }
}

function login() {
  return alert("sorry, under maintenance...");
  const _csrf = $('meta[name="csrf"]').attr("content");
  const account = $('input[type="email"]').val();
  const password = $('input[type="password"]').val();
  $.ajax({
    url: ROOT + "/apiv1/account/login",
    method: "POST",
    data: { _csrf, account, password }
  })
    .done(res => {
      if (res.code === ERR_CODE.Success) {
        window.location.href = res.url;
      }
    })
    .fail(res => {
      if (res.status === 400) {
        alert(res.responseText);
      }
    });
}
