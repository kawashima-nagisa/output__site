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
		trigger: "img.myClass", // スクロールをトリガーにする要素を指定
		start: "top 100%", // スタート位置を遠くに設定
		end: "bottom 0%", // エンド位置を遠くに設定
		scrub: true, // スクロール位置とアニメーションの進行を連動
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
// エリア要素をすべて取得
const areas = document.querySelectorAll(".watch-hover div");

// 各エリアにイベントリスナーを追加
areas.forEach((area, index) => {
	area.addEventListener("mouseover", function () {
		const bg = document.querySelector(".bg");

		// エリアのindexによって背景位置を変更
		switch (index) {
			case 0:
				bg.style.transform = "translate(-1rem, -1rem)";
				break;
			case 1:
				bg.style.transform = "translate(0rem, -1rem)";
				break;
			case 2:
				bg.style.transform = "translate(1rem, -1rem)";
				break;
			case 3:
				bg.style.transform = "translate(-1rem, -2rem)";
				break;
			case 4:
				bg.style.transform = "translate(0rem, -2rem)";
				break;
			case 5:
				bg.style.transform = "translate(1rem, -2rem)";
				break;
			case 6:
				bg.style.transform = "translate(-1rem, -3rem)";
				break;
			case 7:
				bg.style.transform = "translate(0rem, -3rem)";
				break;
			case 8:
				bg.style.transform = "translate(1rem, -3rem)";
				break;
		}
	});
});

window.addEventListener("DOMContentLoaded", () => {
	// プラグインを登録
	gsap.registerPlugin(MotionPathPlugin);

	// たくさんの矩形を配置
	for (let i = 0; i < 50; i++) {
		const rect = document.createElement("div");
		rect.classList.add("rect");
		document.querySelector(".container").appendChild(rect);
	}

	// 一緒くたに移動
	const list = gsap.utils.toArray(".rect");
	list.forEach((rect, offsetIndex) => {
		gsap.fromTo(
			rect,
			{
				x: "100vw",
				scale: 0.0,
			},
			{
				duration: 1 + Math.random() * 20,
				repeat: -1,
				ease: "power1.inOut",
				x: "-100vw",
				motionPath: [
					{ y: (Math.random() - 0.1) * 100 + "vh", scale: 1 },
					{ y: (Math.random() - 0.9) * 100 + "vh", scale: 3 },
				],
				delay: Math.random(),
			}
		);
	});
});

window.addEventListener("DOMContentLoaded", () => {
	const stalker = document.querySelector(".stalker");
	const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
	const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
	const speed = 0.15;

	const xSet = gsap.quickSetter(stalker, "x", "px");
	const ySet = gsap.quickSetter(stalker, "y", "px");

	window.addEventListener("mousemove", (event) => {
		const rectSize = 10;
		mouse.x = event.x - rectSize / 2;
		mouse.y = event.y - rectSize / 2;
	});

	gsap.ticker.add(() => {
		if (mouseLock === true) {
			return;
		}
		const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

		// いわゆるイージングの公式
		pos.x += (mouse.x - pos.x) * dt;
		pos.y += (mouse.y - pos.y) * dt;

		xSet(pos.x);
		ySet(pos.y);
	});

	let mouseLock = false;

	document.querySelectorAll("button").forEach((element) => {
		element.addEventListener("mouseenter", () => {
			const rect = element.getBoundingClientRect();
			mouseLock = true;

			const size = 10;
			const x = (mouse.x = pos.x = rect.x - size);
			const y = (mouse.y = pos.y = rect.y - size);

			gsap.to(stalker, {
				x,
				y,
				width: rect.width + size * 2,
				height: rect.height + size * 2,
				duration: 0.35,
				ease: "back.out",
				overwrite: true,
			});
		});
		element.addEventListener("mouseleave", () => {
			mouseLock = false;

			gsap.to(stalker, {
				width: 10,
				height: 10,
				duration: 1,
				ease: "power4.out",
				overwrite: true,
			});
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let targetElement = document.querySelector(".reserve"); // ターゲット要素を選択

	targetElement.addEventListener("mouseenter", function () {
		gsap.to(targetElement, {
			duration: 0.8,
			ease: "power2.out",
			clipPath: "polygon(50% 0, 71% 52%, 53% 100%, 0 100%, 7% 50%, 0 0)",
		});
	});

	targetElement.addEventListener("mouseleave", function () {
		gsap.to(targetElement, {
			duration: 0.4,
			ease: "power2.out",
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	const images = document.querySelectorAll(".welcome__item");

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("active");
				// 監視している要素がビューポートと交差している場合の処理
			} else {
				entry.target.classList.remove("active");
				// 監視している要素がビューポートと交差していない場合の処理
			}
		});
	});

	images.forEach((image) => {
		observer.observe(image);
	});
});
