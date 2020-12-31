(() => {


    // gif Spike 움직임
	const actions = {
		SpikeFlies(key) {
            // 만약 값이 트루 이면, 아니라면? 
			if (key) {
				document.querySelector('[data-index="2"] .Spike').style.transform = `translateX(${window.innerWidth}px)`;
            }else {
				document.querySelector('[data-index="2"] .Spike').style.transform = `translateX(-100%)`;
			}
		},
		SpikeFlies2(key) {
			if (key) {
				document.querySelector('[data-index="5"] .Spike').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.0}px)`;
			} else {
				document.querySelector('[data-index="5"] .Spike').style.transform = `translateX(-100%)`;
			}
		}
	};
	
	const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    // 현재 활성화된( visible 클래스가 붙은 ) .graphic-item을 지정
	let currentItem = graphicElems[0];
	let ioIndex;

	const io = new IntersectionObserver((entries, observer) => {
        ioIndex = entries[0].target.dataset.index * 1;
        console.log(ioIndex)
	});

    // index 0 ~
	for (let i = 0; i < stepElems.length; i++) {
		io.observe(stepElems[i]);
		stepElems[i].dataset.index = i;
		graphicElems[i].dataset.index = i;
	}

    // true - 1 false -2 실행
	function activate(action) {
		currentItem.classList.add('visible');
		if (action) {
			actions[action](true);
		}
	}

	function inactivate(action) {
		currentItem.classList.remove('visible');
		if (action) {
			actions[action](false);
		}
	}


    //  scroll 이벤트가 발생할 때 , 실행할 것
	window.addEventListener('scroll', () => {
		let step;
		let boundingRect;

		for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
			step = stepElems[i];
			if (!step) continue;
			boundingRect = step.getBoundingClientRect();
			
			if (boundingRect.top > window.innerHeight * 0.1 &&
				boundingRect.top < window.innerHeight * 0.8) {
				
				inactivate(currentItem.dataset.action);
				currentItem = graphicElems[step.dataset.index];
				activate(currentItem.dataset.action);
			}
		}
	});

	window.addEventListener('load', () => {
		setTimeout(() => scrollTo(0, 0), 100);
	});

	activate();

})();
