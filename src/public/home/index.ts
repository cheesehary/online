import $ from 'jquery';
import { ROOT } from '../../util/constants';
import { ERR_CODE } from '../../util/enums';
import IMG_MUTE from './volume-mute-solid.svg';
import IMG_UP from './volume-up-solid.svg';
import VID_HOME from './home_video.mp4';
import './style.sass';

$(() => {
  $('video').prop('src', VID_HOME);
  $('#volume').prop('src', IMG_MUTE);
  $('#volume').on('click', toggleMute);
  $('#join').on('click', toggleLogin);
  $('.sign-up button').on('click', login);
});

function toggleMute() {
  const $volume = $(this);
  const $video = $('video');
  const muted = $video.prop('muted');
  $video.prop('muted', !muted);
  $volume.attr('src', $video.prop('muted') ? IMG_MUTE : IMG_UP);
}

function toggleLogin() {
  const form = $('.sign-up');
  if (form.is(':visible')) {
    form.hide();
  } else {
    form.show();
  }
}

function login() {
  const _csrf = $('meta[name="csrf"]').attr('content');
  const account = $('input[type="email"]').val();
  const password = $('input[type="password"]').val();
  $.ajax({
    url: ROOT + '/apiv1/account/login',
    method: 'POST',
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
