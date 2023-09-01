const StepStart = () => (
  <p className="text-xl text-amber-100">
    Press <b>spacebar</b> to start
  </p>
);

const Sticker = ({ color }) => (
  <div className={`w-[16px] h-[16px] inline-block mx-1 ${color}`}></div>
);

const Move = ({ move }) => (
  <div className="inline-block p-1 font-bold rounded-md bg-slate-200 text-slate-800 w-[32px] h-[32px] font-mono text-center align-middle mx-1">
    {move}
  </div>
);

const StepYellowDaisy = () => (
  <div>
    <p className="text-xl font-bold text-amber-200">Yellow daisy</p>
    <ol className="mt-4 ml-6 text-lg list-decimal">
      <li>
        <p className="flex items-center">
          Find the <Sticker color="bg-yellow-400" /> face
        </p>
      </li>
      <li>
        <p className="flex items-center">
          Surround the center with <Sticker color="bg-slate-100" />{' '}
          <b className="px-1">edges</b>
        </p>
      </li>
    </ol>
  </div>
);

const StepWhiteCross = () => (
  <div>
    <p className="text-xl font-bold text-amber-200">White cross</p>
    <ol className="mt-4 ml-6 text-lg list-decimal">
      <li>
        For each <Sticker color="bg-slate-100" /> <b className="px-1">edge</b>{' '}
        piece on the <Sticker color="bg-yellow-400" /> face
        <ol className="list-decimal">
          <li className="ml-6">
            <p className="flex flex-wrap items-center">
              Match the <b className="px-1">side</b> color of the
              <Sticker color="bg-slate-100" /> <b className="px-1">edge</b>{' '}
              piece with the correct face
            </p>
          </li>
          <li className="ml-6">
            <p className="flex items-center">
              <Move move="F2" />
            </p>
          </li>
        </ol>
      </li>
    </ol>
  </div>
);

const StepBottomLayer = () => (
  <div>
    <p className="text-xl font-bold text-amber-200">Bottom layer</p>
    <ul className="mt-4 ml-6 text-lg list-disc">
      <li>
        If <Sticker color="bg-slate-100" /> is in top side layer
        <ol className="list-decimal">
          <li className="ml-6">
            <p className="flex flex-wrap items-center">
              Match the side color of the <Sticker color="bg-slate-100" />{' '}
              <b className="px-1">edge</b>
              piece with the correct face
            </p>
          </li>
          <li className="ml-6">
            and while side color face is front
            <p className="flex items-center">
              <ul className="ml-4 text-lg list-disc">
                <li>
                  If the
                  <Sticker color="bg-slate-100" /> is to the left{' '}
                  <Move move="LT" />
                </li>
                <li className="mt-1">
                  If the
                  <Sticker color="bg-slate-100" /> is to the right{' '}
                  <Move move="RT" />
                </li>
              </ul>
            </p>
          </li>
        </ol>
      </li>
      <li>
        If <Sticker color="bg-slate-100" /> is in bottom layer
        <ul className="list-disc">
          <li className="ml-6">
            <p className="flex flex-wrap items-center">
              If <Sticker color="bg-slate-100" /> is to the left{' '}
              <div className="ml-1">
                <Move move="LT" />
              </div>
            </p>
          </li>
          <li className="mt-1 ml-6">
            <p className="flex flex-wrap items-center">
              If <Sticker color="bg-slate-100" /> is to the right
              <Move move="RT" />
            </p>
          </li>
        </ul>
      </li>
      <li>
        If <Sticker color="bg-slate-100" /> is in top layer
        <ol className="list-decimal">
          <li className="ml-6">
            <p className="flex flex-wrap items-center">
              Move the <Sticker color="bg-slate-100" /> to project down on a
              different color piece in the <Sticker color="bg-slate-100" /> face
            </p>
          </li>
          <li className="ml-6">
            if the <Sticker color="bg-slate-100" />
            <p className="flex items-center">
              <ul className="ml-4 text-lg list-disc">
                <li>
                  is to the left <Move move="LT" />
                  <Move move="LT" />
                </li>
                <li className="mt-1">
                  is to the right <Move move="RT" />
                  <Move move="RT" />
                </li>
              </ul>
            </p>
          </li>
        </ol>
      </li>
    </ul>
  </div>
);

const StepSecondLayer = () => (
  <div>
    <p className="mb-4 text-xl font-bold text-amber-200">Second layer</p>
    <p>
      For each top layer edge piece which has no yellow stickers make Ts with
      the corresponding face.
    </p>
    <p>
      If the color of the top sticker of the edge piece corresponds to the left
      face <Move move="U'" /> <Move move="LT" />
    </p>
    <p>
      If the color of the top sticker of the edge piece corresponds to the right
      face <Move move="U" /> <Move move="RT" />
    </p>
    <p>
      If there are no top layer edges without yellow stickers find a face that
      has one wrong piece
    </p>
    <p>
      if its on the left <Move move="LT" />
    </p>
    <p>
      if its on the right <Move move="RT" />
    </p>
  </div>
);

const StepYellowCross = () => (
  <div>
    <p className="mb-4 text-xl font-bold text-amber-200">Yellow cross</p>
    <ol className="mt-4 ml-6 text-lg list-decimal">
      <li>
        No <Sticker color="bg-yellow-400" /> edge pieces <Move move="F" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="R'" />
        <Move move="F'" />
      </li>
      <li className="mt-1">
        Line of <Sticker color="bg-yellow-400" /> place the line front to back{' '}
        <Move move="F" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="R'" />
        <Move move="F'" />
      </li>
      <li className="mt-1">
        9 and 12 of <Sticker color="bg-yellow-400" /> <Move move="F" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="R'" />
        <Move move="F'" />
      </li>
    </ol>
  </div>
);

const StepYellowFace = () => (
  <div>
    <p className="mb-4 text-xl font-bold text-amber-200">Yellow face</p>
    <ul className="mt-4 ml-6 text-lg list-disc">
      <li>
        No fish: ensure left face has <Sticker color="bg-yellow-400" /> on top
        right corner
        <Move move="R" />
        <Move move="U" />
        <Move move="R'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U2" />
        <Move move="R'" />
      </li>
      <li>
        Fish: ensure nose is in left bottom corner
        <Move move="R" />
        <Move move="U" />
        <Move move="R'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U2" />
        <Move move="R'" />
      </li>
    </ul>
  </div>
);

const StepTopLayerCorners = () => (
  <div>
    <p className="mb-4 text-xl font-bold text-amber-200">Top layer corners</p>
    <ul className="mt-4 ml-6 text-lg list-disc">
      <li>
        No faces have matching corners
        <Move move="L'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="L" />
        <Move move="U2" />
        <Move move="R'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U2" />
        <Move move="R'" />
      </li>
      <li>
        Some faces have matching corners: hold solved face in left hand
        <Move move="L'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="L" />
        <Move move="U2" />
        <Move move="R'" />
        <Move move="U" />
        <Move move="R" />
        <Move move="U2" />
        <Move move="R'" />
      </li>
    </ul>
  </div>
);

const StepTopLayerEdges = () => (
  <div>
    <p className="mb-4 text-xl font-bold text-amber-200">Top layer edges</p>
    <ul className="mt-4 ml-6 text-lg list-disc">
      <li>
        No faces are finished
        <Move move="F2" />
        <Move move="U'" />
        <Move move="R'" />
        <Move move="L" />
        <Move move="F2" />
        <Move move="L'" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="F2" /> reposition cube and go to step 2
      </li>
      <li>
        Some faces are solved: hold solved face away
        <Move move="F2" />
        <Move move="U" />
        <Move move="R'" />
        <Move move="L" />
        <Move move="F2" />
        <Move move="L'" />
        <Move move="R" />
        <Move move="U" />
        <Move move="F2" />
        or for counter clockwise:
        <Move move="F2" />
        <Move move="U'" />
        <Move move="R'" />
        <Move move="L" />
        <Move move="F2" />
        <Move move="L'" />
        <Move move="R" />
        <Move move="U'" />
        <Move move="F2" />
      </li>
    </ul>
  </div>
);

const Steps = [
  { name: 'Start', component: StepStart },
  { name: 'Yellow daisy', component: StepYellowDaisy },
  { name: 'White cross', component: StepWhiteCross },
  { name: 'Bottom layer', component: StepBottomLayer },
  { name: 'Second layer', component: StepSecondLayer },
  { name: 'Yellow cross', component: StepYellowCross },
  { name: 'Yellow face', component: StepYellowFace },
  { name: 'Top layer corners', component: StepTopLayerCorners },
  { name: 'Top layer edges', component: StepTopLayerEdges },
];

export default Steps;
