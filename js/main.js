window.addEventListener("scroll", function () {
	// ウィンドウの高さを取得
	const windowHeight = window.innerHeight;

	// 現在のスクロール位置を取得
	const scroll = window.scrollY;

	// 'element'クラスを持つ全ての要素を取得
	const elements = document.querySelectorAll(".element");

	elements.forEach(function (element) {
		// 要素の位置を取得
		const targetPosition = element.getBoundingClientRect().top + scroll;

		// スクロールが要素の位置を超えた場合、'is-fadein'クラスを追加
		if (scroll > targetPosition - windowHeight + 100) {
			element.classList.add("is-fadein");
		}
	});
});

const swiperThumbnail = new Swiper(".swiper-thumbnail", {
	spaceBetween: 10, //スライド感の余白
	slidesPerView: 3, //一度に表示するスライド枚数
	watchSlidesProgress: true, //スライダーの動きにスライドを追従させる
});
// スライダー
const slider = new Swiper(".slider", {
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	autoplay: true,
	loop: true,
	effect: "cube",
	direction: "vertical",
	thumbs: {
		swiper: swiperThumbnail, //連動したいスライダー（swiperThumbnailを指定する）
	},
});
gsap.registerPlugin(ScrollTrigger);

gsap.to("img.myClass", {
	scrollTrigger: {
		trigger: "img.myClass", // スクロールをトリガーにする要素を指定します
		start: "top 100%", // スタート位置を遠くに設定
		end: "bottom 0%", // エンド位置を遠くに設定
		scrub: true, // スクロール位置とアニメーションの進行を連動させます
	},
	delay: 4,
	duration: 7,
	y: -50,
	x: 40,
	opacity: 1,
	ease: "power2.out",
	stagger: {
		from: "start",
		amount: 0.8,
	},
});
window.addEventListener("load", function () {
	var svgDocument = document.getElementById("svg-object").contentDocument;

	let tl = gsap.timeline({ repeat: 0 });

	for (let i = 1; i <= 15; i++) {
		tl.from(svgDocument.querySelector(`.svg-elem-${i}`), {
			duration: 0.5,
			opacity: 0,
			stagger: 0.3,
		});
	}
});
