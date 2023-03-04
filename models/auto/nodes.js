const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nodes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    understood: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "对于单词的解释理解"
    },
    num: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "数词"
    },
    pron: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "代词"
    },
    adj: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "形容词"
    },
    prep: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "介词"
    },
    conj: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "连词"
    },
    int: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "感叹词"
    },
    vi: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "不及物动词"
    },
    cn: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "可数名词"
    },
    vt: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "及物动词"
    },
    uncn: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "不可数名词"
    },
    art: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "冠词"
    },
    adv: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "副词"
    },
    verb: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "动词"
    },
    noun: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "名词"
    },
    cet4: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "4"
    },
    primaryschool: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "小学"
    },
    middleschool: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "初中"
    },
    highschool: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "高中"
    },
    cet6: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "6"
    },
    kaoyan: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "考研"
    },
    ielts: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "雅思"
    },
    gre: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "GRE"
    },
    toefl: {
      type: DataTypes.TINYINT,
      allowNull: true,
      comment: "托福"
    }
  }, {
    sequelize,
    tableName: 'nodes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
