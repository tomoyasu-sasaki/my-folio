import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'

export function setupFloorUI(scene: BABYLON.Scene, floor: number): void {
    // --- Welcome Text (Fullscreen UI) ---
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')

    // センターに表示するテキスト
    const welcomeText = new GUI.TextBlock()
    welcomeText.color = 'white'
    welcomeText.fontSize = 24
    welcomeText.top = '-40%'
    welcomeText.lineSpacing = 20
    advancedTexture.addControl(welcomeText)

    // フロアごとの表示内容を設定
    switch (floor) {
        case 2: {
            welcomeText.text = 'ようこそ my-folio へ\nごゆるりどうぞ'

            // 掲示板の作成
            const boardWidth = 4
            const boardHeight = 3
            const board = BABYLON.MeshBuilder.CreatePlane(
                'noticeBoard1',
                { width: boardWidth, height: boardHeight },
                scene
            )
            // 掲示板の位置と回転を設定
            board.position = new BABYLON.Vector3(4.9, 2, -3) // 壁の少し手前に配置
            board.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0) // 壁に向ける

            // 掲示板にテキストを表示
            const boardTexture = GUI.AdvancedDynamicTexture.CreateForMesh(board, 1024, 768)

            // 背景を設定
            const backgroundRect = new GUI.Rectangle()
            backgroundRect.width = '100%'
            backgroundRect.height = '100%'
            backgroundRect.background = 'white'
            backgroundRect.alpha = 0.8
            boardTexture.addControl(backgroundRect)

            const floorTextBlock1 = new GUI.TextBlock()
            floorTextBlock1.text =
                'フロア案内\n' +
                '・1階（ロビー）: ウェルカムメッセージ\n' +
                '・2階（自己紹介）: プロフィール、経歴、資格\n' +
                '・3階（プロジェクト）: 過去のプロジェクト一覧と詳細\n' +
                '・4階（スキルセット）: プログラミング言語、ツール、\n              技術スタックの紹介\n' +
                '・5階（連絡先）: お問い合わせフォーム、SNSリンク'
            floorTextBlock1.color = 'black'
            floorTextBlock1.fontSize = 40
            floorTextBlock1.lineSpacing = 30
            floorTextBlock1.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
            floorTextBlock1.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            floorTextBlock1.paddingTop = '20px'
            floorTextBlock1.paddingLeft = '20px'
            backgroundRect.addControl(floorTextBlock1)
            break
        }

        case 1: {
            welcomeText.text = `ここは ${floor} 階です。\n自己紹介、経歴、スキルセットをご覧いただけます。`

            // --- 掲示板1: 自己紹介 ---
            const boardWidth = 4
            const boardHeight = 3
            const board1 = BABYLON.MeshBuilder.CreatePlane(
                'profileBoard',
                { width: boardWidth, height: boardHeight },
                scene
            )
            board1.position = new BABYLON.Vector3(4.9, 2, -3) // 壁の少し手前に配置
            board1.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0) // 壁に向ける

            const boardTexture1 = GUI.AdvancedDynamicTexture.CreateForMesh(board1, 1024, 768)

            const backgroundRect1 = new GUI.Rectangle()
            backgroundRect1.width = '100%'
            backgroundRect1.height = '100%'
            backgroundRect1.background = 'white'
            backgroundRect1.alpha = 0.8
            boardTexture1.addControl(backgroundRect1)

            const profileStack = new GUI.StackPanel()
            profileStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER // 縦方向の中央に配置
            profileStack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER // 水平方向の中央に配置
            profileStack.paddingTop = '20px'
            profileStack.width = '90%' // 幅を80%に設定して中央に配置
            profileStack.height = '100%'
            backgroundRect1.addControl(profileStack)

            // プロフィール写真
            const profileImage = new GUI.Image('profileImage', '/logo2.svg') // 画像のパスを正しく設定
            profileImage.width = '200px'
            profileImage.height = '200px'
            profileImage.paddingBottom = '20px'
            profileStack.addControl(profileImage)

            // 氏名
            const nameText = new GUI.TextBlock()
            nameText.text = '佐々木智康'
            nameText.color = 'black'
            nameText.fontSize = 36
            nameText.height = '60px'
            nameText.paddingBottom = '20px'
            nameText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT // 左揃え
            profileStack.addControl(nameText)

            // 肩書き
            const titleText = new GUI.TextBlock()
            titleText.text = 'ソフトウェアエンジニア'
            titleText.color = 'gray'
            titleText.fontSize = 28
            titleText.height = '50px'
            titleText.paddingBottom = '20px'
            titleText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT // 左揃え
            profileStack.addControl(titleText)

            // 自己紹介
            const bioText = new GUI.TextBlock()
            bioText.text =
                'こんにちは、ソフトウェアエンジニアの佐々木智康です。\nフロントエンド開発を中心に、Vue.jsやTypeScriptを得意としています。\nIT系の専門学校に進学し、卒業後は札幌の第三者検証の会社に就職しました。\n現在は転職しWebアプリケーションのフロントエンド開発を行っています。\n問題解決能力とチームワークを大切にし、新技術のキャッチアップにも積極的です。\n趣味は読書とお酒で、自然の中でリフレッシュしています。\n今後はAI技術を活用したサービス開発に挑戦したいと考えています。'
            bioText.color = 'black'
            bioText.fontSize = 22
            bioText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT // テキスト内の左揃え
            bioText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            bioText.height = '400px'
            bioText.lineSpacing = '15px'
            bioText.paddingLeft = '50px'
            bioText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT // 左揃え
            profileStack.addControl(bioText)

            // --- 掲示板2: 経歴 ---
            const board2 = BABYLON.MeshBuilder.CreatePlane(
                'careerBoard',
                { width: boardWidth, height: boardHeight },
                scene
            )
            board2.position = new BABYLON.Vector3(4.9, 2, 2) // 壁の少し手前に配置
            board2.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0) // 壁に向ける

            const boardTexture2 = GUI.AdvancedDynamicTexture.CreateForMesh(board2, 1024, 768)

            const backgroundRect2 = new GUI.Rectangle()
            backgroundRect2.width = '100%'
            backgroundRect2.height = '100%'
            backgroundRect2.background = 'white'
            backgroundRect2.alpha = 0.8
            boardTexture2.addControl(backgroundRect2)

            // 経歴を年表形式で表示するためのStackPanelを作成
            const timelineStack = new GUI.StackPanel()
            timelineStack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
            timelineStack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            timelineStack.width = '90%'
            timelineStack.height = '100%'
            timelineStack.paddingTop = '20px'
            backgroundRect2.addControl(timelineStack)

            // 縦の棒線（タイムラインの背骨を表現）
            const timelineLine = new GUI.Line()
            timelineLine.lineWidth = 5
            timelineLine.color = 'black'
            timelineLine.x1 = 0
            timelineLine.y1 = 0
            timelineLine.x2 = 0
            timelineLine.y2 = 1 // 全体の高さにする
            timelineLine.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            timelineLine.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            backgroundRect2.addControl(timelineLine)

            // 経歴のデータを配列で定義
            const careerData = [
                {
                    date: '2000/07',
                    title: '生まれる',
                    subtitle: '',
                    description: '埼玉県で生まれる'
                },
                {
                    date: '2019/03',
                    title: '高校卒業',
                    subtitle: 'いざ東京へ',
                    description:
                        '高校卒業の数日後に上京。日経新聞社社寮という名の大田区にあるボロボロの販売店に配属'
                },
                {
                    date: '2021/03',
                    title: '専門学校卒業',
                    subtitle: 'いざ札幌へ',
                    description:
                        '日本工学院専門学校の情報処理科システム開発コースを卒業し同時期に新聞奨学生も卒業'
                },
                {
                    date: '2021/04',
                    title: '第三者検証の企業に就職',
                    subtitle: '就職を機に札幌へ北上',
                    description:
                        '日本ナレッジ株式会社札幌支社に就職。基幹業務システムの仕様追加等の業務に従事'
                },
                {
                    date: '2022/09',
                    title: '転職',
                    subtitle: '他の会社へ転職',
                    description: 'さまざまな案件を経験するために株式会社エスプランニングへ転職'
                }
            ]

            // 経歴のタイトル
            const careerTitle = new GUI.TextBlock()
            careerTitle.text = '経歴・職歴'
            careerTitle.color = 'black'
            careerTitle.fontSize = 32
            careerTitle.height = '60px'
            careerTitle.paddingBottom = '20px'
            careerTitle.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
            timelineStack.addControl(careerTitle)

            // 経歴データをタイムライン形式で表示
            careerData.forEach((item) => {
                const itemStack = new GUI.StackPanel()
                itemStack.isVertical = false
                itemStack.width = '100%'
                itemStack.height = '60px' // 高さを増やして見やすく
                itemStack.paddingBottom = '20px'

                // アイコン（点）を追加してタイムライン風にする
                const dot = new GUI.Ellipse()
                dot.width = '20px'
                dot.height = '20px'
                dot.color = 'gray'
                dot.thickness = 2
                dot.background = 'white'
                itemStack.addControl(dot)

                // 年を表示
                const yearText = new GUI.TextBlock()
                yearText.text = item.date
                yearText.color = 'gray'
                yearText.fontSize = 20
                yearText.width = '100px'
                yearText.paddingLeft = '10px' // ドットとの間隔を追加
                yearText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
                itemStack.addControl(yearText)

                // イベントのタイトルを表示
                const eventText = new GUI.TextBlock()
                eventText.width = '100%'
                eventText.text = item.title
                eventText.color = 'black'
                eventText.fontSize = 24
                eventText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
                itemStack.addControl(eventText)

                timelineStack.addControl(itemStack)
            })

            // --- 掲示板3: スキルセット ---
            // 掲示板3: スキルセット
            const board3 = BABYLON.MeshBuilder.CreatePlane(
                'skillsBoard',
                { width: boardWidth, height: boardHeight },
                scene
            )
            board3.position = new BABYLON.Vector3(-4.9, 2, 1) // 壁の少し手前に配置
            board3.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0) // 壁に向ける

            const boardTexture3 = GUI.AdvancedDynamicTexture.CreateForMesh(board3, 1024, 768)

            // 背景を設定
            const backgroundRect3 = new GUI.Rectangle()
            backgroundRect3.width = '100%'
            backgroundRect3.height = '100%'
            backgroundRect3.background = 'white'
            backgroundRect3.alpha = 0.8
            boardTexture3.addControl(backgroundRect3)

            // スキルセットの表示領域
            const skillStackPanel = new GUI.StackPanel()
            skillStackPanel.width = '90%'
            skillStackPanel.height = '100%'
            skillStackPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
            skillStackPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
            skillStackPanel.paddingTop = '20px'
            backgroundRect3.addControl(skillStackPanel)

            // スキルデータ
            const skillsData = [
                { name: 'Vue.js', experience: 50, liking: 80 },
                { name: 'React', experience: 0, liking: 0 },
                { name: 'HTML/CSS', experience: 80, liking: 80 },
                { name: 'Nuxt.js', experience: 20, liking: 20 },
                { name: 'PHP', experience: 10, liking: 10 },
                { name: 'Node.js', experience: 10, liking: 20 },
                { name: 'Python(Django)', experience: 10, liking: 20 },
                { name: 'MySQL', experience: 10, liking: 20 },
                { name: 'PostgreSQL', experience: 0, liking: 0 },
                { name: 'SQL Server', experience: 30, liking: 20 },
                { name: 'MongoDB', experience: 0, liking: 0 },
                { name: 'Oracle', experience: 0, liking: 0 },
                { name: 'EC2', experience: 0, liking: 0 },
                { name: 'S3', experience: 0, liking: 0 },
                { name: 'Lambda', experience: 0, liking: 0 },
                { name: 'CloudFront', experience: 0, liking: 0 }
            ]

            skillsData.forEach((skill) => {
                // スキル名
                const skillText = new GUI.TextBlock()
                skillText.text = skill.name
                skillText.height = '40px'
                skillText.width = '150px' // 幅を固定
                skillText.color = 'black'
                skillText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER // 中央揃えに変更
                skillStackPanel.addControl(skillText)

                // グラフ用パネル（横方向のレイアウトに変更）
                const graphPanel = new GUI.StackPanel()
                graphPanel.isVertical = false // 横方向に変更
                graphPanel.height = '100px' // 高さを確保
                graphPanel.width = '100%' // パネルの幅を100%に固定
                graphPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
                skillStackPanel.addControl(graphPanel)

                // 経験レベルバー
                const experienceBar = new GUI.Rectangle()
                experienceBar.height = `${skill.experience * 1.5}px` // 高さを経験値に応じて変更
                experienceBar.width = '40px' // 幅を固定
                experienceBar.background = 'blue'
                experienceBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
                graphPanel.addControl(experienceBar)

                // 経験値テキスト（バーの下に配置）
                const experienceText = new GUI.TextBlock()
                experienceText.text = `${skill.experience}%`
                experienceText.height = '30px'
                experienceText.width = '40px'
                experienceText.color = 'black'
                experienceText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
                graphPanel.addControl(experienceText)

                // 好き度バー
                const likingBar = new GUI.Rectangle()
                likingBar.height = `${skill.liking * 1.5}px` // 高さを好き度に応じて変更
                likingBar.width = '40px' // 幅を固定
                likingBar.background = 'green'
                likingBar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
                graphPanel.addControl(likingBar)

                // 好き度テキスト（バーの下に配置）
                const likingText = new GUI.TextBlock()
                likingText.text = `${skill.liking}%`
                likingText.height = '30px'
                likingText.width = '40px'
                likingText.color = 'black'
                likingText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
                graphPanel.addControl(likingText)
            })

            break
        }

        // 他のフロアのケース（省略）

        default: {
            welcomeText.text = `ここは ${floor} 階です。`

            // 必要に応じて他のフロアの表示内容を設定
            break
        }
    }
}
