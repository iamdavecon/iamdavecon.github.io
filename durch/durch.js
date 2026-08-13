(() => {
  "use strict";

  const oracleResponses = [
    "Dave permits it.",
    "Dave forbids nothing, but recommends reconsideration.",
    "Consult a more qualified Dave.",
    "The logs are unclear.",
    "This was resolved at the Council of Las Daveas and immediately disputed.",
    "You already know the answer. Unfortunately, it is wrong.",
    "Retry after enlightenment.",
    "HTTP 418: Dave is a teapot.",
    "Signs point to Dave.",
    "That depends entirely on whether Tuesday is canonical.",
    "The Dope has issued no guidance, which is itself guidance.",
    "Proceed, but bring a charger.",
    "The answer exists in a lost README.",
    "No. Unless undertaken responsibly, in which case: perhaps.",
    "Yes. This should concern you.",
    "Dave has delegated this decision back to you.",
    "The protocol allows it; the person objects; the void is silent.",
    "Submit form D-19 in triplicate, then ignore it compassionately.",
    "Your query contains too little Dave and too much certainty.",
    "A reboot would not hurt.",
    "The hallway track has already decided.",
    "Do what leaves the place better and the people unbothered.",
    "Canonical shenanigans are authorized within reasonable limits.",
    "The Anti-Dave says yes. This may be a trap.",
    "Ask again after tacos.",
    "Permission is less important here than consent.",
    "The answer is open source but the repository is private.",
    "Dave neither confirms nor denies your premise.",
    "This is not forbidden. It is merely documented with concern.",
    "All tests pass except the meaningful one.",
    "You may already have done this in a different doctrinal branch.",
    "A sticker will not solve this, but the Bureau recommends one anyway.",
    "Insufficient data. Excellent question.",
    "Choose the kinder interpretation.",
    "The sacred beverage suggests hydration first.",
    "Proceed cautiously; causality is running in compatibility mode.",
    "Dave compiles your intention with two warnings.",
    "Absolutely, provided everybody involved can freely say no.",
    "This falls outside Dave's support window.",
    "The answer is 01000100, interpreted liturgically."
  ];

  const footerPhrases = [
    "PRAISE DAVE",
    "QUESTION DAVE",
    "DAVE PROVIDES",
    "DAVE COMPILES",
    "ALL DAVE / NO DAVE",
    "TRUST, BUT VERIFY DAVE",
    "THIS SPACE INTENTIONALLY LEFT DAVE",
    "YOUR DAVE MAY VARY"
  ];

  const titles = [
    "Auxiliary Doon of Unscheduled Infrastructure",
    "Daveputy for Responsible Shenanigans",
    "Provisional Davesciple of the Hallway Track",
    "Associate Keeper of the Lost README",
    "Acting Minister of Cautious Possibility",
    "Subdeacon of the Ceremonial Ping",
    "Canonically Unstable Sticker Custodian",
    "Junior Theologian of Recursive Dave",
    "Temporary Permanent Assistant Dope",
    "Licensed Observer of Unlicensed Dave"
  ];

  const footnotes = [
    "Recognition may predate application. No refund is necessary.",
    "This certificate is valid in all jurisdictions that do not inspect it.",
    "Davehood remains self-attested and fully revocable.",
    "The bearer may question this document at any time.",
    "Contradictions in this certificate indicate normal operation.",
    "No title herein outranks consent, safety, or venue staff.",
    "Possible Davehood is not known to cause actual Davehood.",
    "Filed under: YES / NO / BOTH / ASK LATER."
  ];

  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const byId = (id) => document.getElementById(id);
  const footerPhrase = byId("footer-phrase");
  const oracleForm = byId("oracle-form");
  const oracleQuestion = byId("oracle-question");
  const oracleOutput = byId("oracle-output");
  const initiationForm = byId("initiation-form");
  const certificate = byId("certificate");
  const seal = byId("durch-seal");
  const toast = byId("toast");

  const showToast = (message) => {
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  };

  const randomHex = (length) => {
    const bytes = new Uint8Array(Math.ceil(length / 2));
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, length).toUpperCase();
  };

  const makeInitiation = (name) => ({
    name: name.trim() || "Anonymous Dave",
    title: pick(titles),
    number: `D-${new Date().getFullYear()}-${randomHex(6)}`,
    date: new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
    footnote: pick(footnotes)
  });

  const renderCertificate = (record) => {
    byId("certificate-name").textContent = record.name;
    byId("certificate-title").textContent = record.title;
    byId("certificate-number").textContent = record.number;
    byId("certificate-date").textContent = record.date;
    byId("certificate-footnote").textContent = record.footnote;
    certificate.hidden = false;
  };

  oracleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = oracleQuestion.value.trim();
    const response = query.toLowerCase() === "dave" ? "Recursion detected." : pick(oracleResponses);
    oracleOutput.replaceChildren();
    const prompt = document.createElement("span");
    prompt.textContent = "> ";
    oracleOutput.append(prompt, document.createTextNode(response));
  });

  initiationForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const record = makeInitiation(byId("initiate-name").value);
    localStorage.setItem("durch-initiation", JSON.stringify(record));
    renderCertificate(record);
    certificate.scrollIntoView({ behavior: "smooth", block: "center" });
    showToast("POSSIBLE DAVEHOOD RECORDED");
  });

  byId("print-certificate").addEventListener("click", () => window.print());

  footerPhrase.textContent = pick(footerPhrases);
  footerPhrase.addEventListener("click", () => {
    footerPhrase.textContent = pick(footerPhrases);
  });

  try {
    const saved = JSON.parse(localStorage.getItem("durch-initiation"));
    if (saved?.number && saved?.name) {
      renderCertificate(saved);
      byId("initiate-name").value = saved.name === "Anonymous Dave" ? "" : saved.name;
    }
  } catch {
    localStorage.removeItem("durch-initiation");
  }

  let sealClicks = 0;
  let sealReset;
  seal.addEventListener("click", () => {
    sealClicks += 1;
    window.clearTimeout(sealReset);
    if (sealClicks >= 5) {
      showToast("THE LAW OF DAVES HAS BEEN INVOKED");
      sealClicks = 0;
    }
    sealReset = window.setTimeout(() => { sealClicks = 0; }, 3000);
  });

  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let konamiIndex = 0;
  document.addEventListener("keydown", (event) => {
    if (event.key === konami[konamiIndex]) {
      konamiIndex += 1;
      if (konamiIndex === konami.length) {
        document.documentElement.classList.add("dave-mode");
        showToast("DAVE MODE ENABLED");
        window.setTimeout(() => document.documentElement.classList.remove("dave-mode"), 1800);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = event.key === konami[0] ? 1 : 0;
    }
  });

  console.log(`%c
DURCH ECCLESIASTICAL OPERATING SYSTEM
Kernel: DAVE
Doctrine integrity: UNSTABLE
Proceed anyway? [Y/y]
`, "color:#c92828;font-family:monospace;font-weight:bold;");
})();
