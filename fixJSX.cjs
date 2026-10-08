const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// The faulty closing is around line 763:
//               )}
//             </>
//           )}
//
//           {type === 'confirm_build' && (() => {

// Let's just fix it carefully with string replacement.
const badEnding = `                </div>
              )}
            </>
          )}

          {type === 'confirm_build' && (() => {`;

const goodEnding = `                </div>
              )}
            </>
          )}
          </>
        )}

        {type === 'confirm_build' && (() => {`;

code = code.replace(badEnding, goodEnding);
fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Fixed JSX syntax error.");
